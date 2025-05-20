import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InstalledMCPServers from './InstalledMCPServers';
import SearchMCPServers from './SearchMCPServers';
import { UnrealProjectSelector } from './UnrealProjectSelector';
import { useVscodeApi } from '../contexts/VscodeApiContext';

const MCPServers: React.FC = () => {
  const vscodeApi = useVscodeApi();

  return (
    <div className="p-4">
      <Tabs defaultValue="unreal" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="unreal" className="transition-all duration-300 data-[state=active]:bg-[var(--vscode-list-activeSelectionBackground)] data-[state=active]:border-[var(--vscode-focusBorder)]">
            Unreal Engine
          </TabsTrigger>
          <TabsTrigger value="installed" className="transition-all duration-300 data-[state=active]:bg-[var(--vscode-list-activeSelectionBackground)] data-[state=active]:border-[var(--vscode-focusBorder)]">
            Installed
          </TabsTrigger>
          <TabsTrigger value="search" className="transition-all duration-300 data-[state=active]:bg-[var(--vscode-list-activeSelectionBackground)] data-[state=active]:border-[var(--vscode-focusBorder)]">
            Search
          </TabsTrigger>
        </TabsList>
        <TabsContent value="unreal">
          <UnrealProjectSelector
            onProjectSelected={(projectPath: string) => {
              console.log('Project selected:', projectPath);
              // Send message to extension to update the MCP server configuration
              try {
                vscodeApi.postMessage({
                  type: 'selectUnrealProject',
                  projectPath
                });
              } catch (error) {
                console.error('Error sending message to extension:', error);
              }
            }}
          />
        </TabsContent>
        <TabsContent value="installed">
          <InstalledMCPServers />
        </TabsContent>
        <TabsContent value="search">
          <SearchMCPServers />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MCPServers;
