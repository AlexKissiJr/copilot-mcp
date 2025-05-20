<div align="center">
<h1>CreateLex MCP for VSCode</h1>
</div>
<div align="center">

[![](https://img.shields.io/badge/CreateLex-MCP-blue)](https://createlex.com)

</div>
<div style="display: flex; justify-content: center; gap: 20px; margin: 20px 0;">
  <img width="800" alt="image" src="./demo.gif" />
</div>
<div align="center">

![Version](https://img.shields.io/badge/version-0.0.41-blue.svg?cacheSeconds=2592000)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![VSCode Extension](https://img.shields.io/badge/VSCode-Extension-blue.svg?logo=visual-studio-code)](https://code.visualstudio.com/api/references/extension-guidelines)
[![MCP Client](https://img.shields.io/badge/MCP-Client-green.svg)](https://modelcontextprotocol.io/clients)



</div>

> A powerful VSCode extension that connects to CreateLex MCP servers for Unreal Engine integration. This extension enables seamless communication between VSCode and Unreal Engine through the Model Context Protocol (MCP), allowing you to leverage AI capabilities directly in your game development workflow.

## ✨ Features

- 🔧 **MCP Server Management**: Connect to CreateLex MCP servers through an intuitive UI
- 🚀 **Unreal Engine Integration**: Seamless communication with Unreal Engine through MCP
- 🎯 **AI Model Access**: Access to powerful AI models for game development
- ⚡ **Server Health Monitoring**: Real-time monitoring of MCP server status and connections
- 🔄 **Automatic Connection Management**: Seamless handling of MCP server connections and reconnections


## 📦 Installation

1. Download the VSIX file from the [CreateLex website](https://createlex.com)
2. Install the extension in VSCode using the "Install from VSIX" option
3. Configure your CreateLex MCP server through the extension settings
4. Start using the CreateLex MCP tools with Unreal Engine!

## 🛠️ Configuration

You can configure your CreateLex MCP server in the UI or in VSCode settings.

In the UI, look for the "CreateLex MCP" button in the activity bar.

## 🚀 Usage

1. Open the CreateLex MCP view from the VSCode activity bar
2. Select your Unreal Engine project folder in the "Unreal Engine" tab
3. The extension will automatically find the MCP server at `[Project]\Plugins\UnrealGenAISupport\Content\Python\mcp_server.py`
4. Connect to your Unreal Engine project through the MCP server

### Connecting to Unreal Engine

The extension is pre-configured to connect to the `mcp_server.py` in your Unreal Engine plugin. The server configuration uses the following settings:

```json
{
  "name": "CreateLex-UnrealEngine",
  "type": "stdio",
  "command": "python",
  "args": ["C:\\Path\\To\\Your\\UnrealProject\\Plugins\\UnrealGenAISupport\\Content\\Python\\mcp_server.py"],
  "env": {
    "UNREAL_ENGINE_HOST": "127.0.0.1",
    "UNREAL_ENGINE_PORT": "9877",
    "UNREAL_PROJECT_PATH": "C:\\Path\\To\\Your\\UnrealProject"
  }
}
```

Make sure your Unreal Engine plugin is properly installed and the `mcp_server.py` file is accessible in your Python path.

## 🔗 Requirements

- VSCode
- Unreal Engine 5.1 or later
- CreateLex account

## 🌟 Benefits

- Seamless integration between VSCode and Unreal Engine
- Access to powerful AI models for game development
- Improved workflow efficiency with AI-assisted development
- Cross-platform support for Windows, Mac, and Linux

## 👥 Support

For support, please contact us at [support@createlex.com](mailto:support@createlex.com) or visit our [website](https://createlex.com).

## ✍️ Author

**Alex Kissi Jr**

* Website: https://createlex.com
* Github: [@AlexKissiJr](https://github.com/AlexKissiJr)

## 📝 License

Copyright © 2024 [Alex Kissi Jr](https://createlex.com).

This project is licensed under the [GNU General Public License v3.0](LICENSE).

---

_Part of the CreateLex AI ecosystem - Empowering game developers with advanced AI tools_ ⭐️
