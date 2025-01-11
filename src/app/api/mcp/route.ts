import { callMcpTool } from '@/lib/mcp';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { prompt } = await request.json();
  try {
    const response = await callMcpTool('llama', 'get_llama_response', { prompt });
    return NextResponse.json({ response });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
