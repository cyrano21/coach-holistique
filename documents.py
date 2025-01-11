import os
import sys
import json
import ollama

from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.vectorstores import Chroma

# Configuration
DOCUMENTS_DIR = "G:\\projet-coach-holistique\\Documents"
CHROMA_PATH = "G:\\projet-coach-holistique\\chroma_db"

def load_documents(directory):
    """Charger tous les documents PDF du répertoire."""
    documents = []
    for filename in os.listdir(directory):
        if filename.endswith(".pdf"):
            filepath = os.path.join(directory, filename)
            try:
                loader = PyPDFLoader(filepath)
                documents.extend(loader.load())
            except Exception as e:
                print(f"Erreur lors du chargement de {filename}: {e}")
    return documents

def split_documents(documents):
    """Diviser les documents en chunks."""
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000, 
        chunk_overlap=200, 
        length_function=len
    )
    return text_splitter.split_documents(documents)

def create_vector_store(texts):
    """Créer un index vectoriel."""
    embeddings = OllamaEmbeddings(model="llama2")
    return Chroma.from_documents(
        texts, 
        embeddings, 
        persist_directory=CHROMA_PATH
    )

def search_documents(query, k=5):
    """Rechercher des documents similaires."""
    embeddings = OllamaEmbeddings(model="llama2")
    db = Chroma(
        persist_directory=CHROMA_PATH, 
        embedding_function=embeddings
    )
    results = db.similarity_search(query, k=k)
    return results

def generate_response(query, context):
    """Générer une réponse avec Ollama."""
    full_prompt = f"""
    Contexte: {context}
    
    Question: {query}
    
    Réponds de manière précise et informative en utilisant uniquement les informations du contexte.
    """
    
    response = ollama.chat(model='llama2', messages=[
        {'role': 'user', 'content': full_prompt}
    ])
    
    return response['message']['content']

def main():
    # Charger et indexer les documents
    documents = load_documents(DOCUMENTS_DIR)
    texts = split_documents(documents)
    vectorstore = create_vector_store(texts)
    
    print(f"Indexé {len(texts)} chunks de documents.")
    
    # Mode interactif
    while True:
        query = input("\nPosez votre question (ou 'exit' pour quitter) : ")
        if query.lower() == 'exit':
            break
        
        try:
            # Rechercher des documents pertinents
            similar_docs = search_documents(query)
            context = "\n\n".join([doc.page_content for doc in similar_docs])
            
            # Générer une réponse
            response = generate_response(query, context)
            
            print("\n--- Réponse ---")
            print(response)
            
            print("\n--- Documents sources ---")
            for doc in similar_docs:
                print(f"- {doc.metadata['source']}")
        
        except Exception as e:
            print(f"Erreur : {e}")

if __name__ == "__main__":
    main()