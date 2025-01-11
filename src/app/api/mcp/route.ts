
import { callMcpTool } from '@/lib/mcp';
import { NextResponse } from 'next/server';

interface RequestBody {
  prompt: string;
}

export async function POST(request: Request) {
  const body = await request.json() as RequestBody;
  try {
    const response = await callMcpTool('llama', 'get_llama_response', { prompt: body.prompt });
    return NextResponse.json({ response });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
