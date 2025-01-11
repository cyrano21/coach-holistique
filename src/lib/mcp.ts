
interface McpToolArgs {
  prompt?: string;
  [key: string]: any;
}

export async function callMcpTool(serverName: string, toolName: string, args: McpToolArgs) {
  const response = await fetch('/api/tool', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      server_name: serverName,
      tool_name: toolName,
      arguments: args,
    }),
  });

  if (!response.ok) {
    const message = `MCP Tool call failed with status: ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();
  return data;
}
