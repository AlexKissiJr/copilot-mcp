/**
 * Default MCP server configuration for CreateLex
 * @param projectPath Optional path to the Unreal Engine project
 */
export const defaultMcpConfig = (projectPath?: string) => {
  // If a project path is provided, use the mcp_server.py from that project
  const command = projectPath
    ? "python"
    : "python";

  const args = projectPath
    ? [projectPath + "\\Plugins\\UnrealGenAISupport\\Content\\Python\\mcp_server.py"]
    : ["-m", "mcp_server"];

  return {
    "name": "CreateLex-UnrealEngine",
    "type": "stdio",
    "command": command,
    "args": args,
    "env": {
      "UNREAL_ENGINE_HOST": "127.0.0.1",
      "UNREAL_ENGINE_PORT": "9877",
      "UNREAL_PROJECT_PATH": projectPath || ""
    }
  };
};
