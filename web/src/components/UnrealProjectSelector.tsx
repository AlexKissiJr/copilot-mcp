import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { FolderOpen } from 'lucide-react';
import { useVscodeApi } from '../contexts/VscodeApiContext';

interface UnrealProjectSelectorProps {
  onProjectSelected: (projectPath: string) => void;
  initialProjectPath?: string;
}

export const UnrealProjectSelector = ({ onProjectSelected, initialProjectPath = '' }: UnrealProjectSelectorProps) => {
  const [projectPath, setProjectPath] = useState<string>(initialProjectPath);
  const [isValidPath, setIsValidPath] = useState<boolean>(false);
  const vscodeApi = useVscodeApi();

  useEffect(() => {
    // In a real implementation, we would validate the path
    // Since we can't directly access the file system from the webview,
    // we'll assume the path is valid if it's not empty
    setIsValidPath(!!projectPath);
  }, [projectPath]);

  // Set up message listener for project path updates
  useEffect(() => {
    const messageHandler = (event: MessageEvent) => {
      console.log('Message received:', event.data);
      const message = event.data;
      if (message.type === 'unrealProjectSelected' && message.projectPath) {
        console.log('Project path received:', message.projectPath);
        setProjectPath(message.projectPath);
      }
    };

    // Add the event listener
    window.addEventListener('message', messageHandler);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('message', messageHandler);
    };
  }, []);

  const handleBrowse = () => {
    console.log('Browse button clicked');
    // Send a message to the extension to show a directory picker
    try {
      vscodeApi.postMessage({
        type: 'browseUnrealProject'
      });
    } catch (error) {
      console.error('Error sending message to extension:', error);
    }
  };

  const handleSave = () => {
    if (isValidPath) {
      onProjectSelected(projectPath);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Select Unreal Engine Project</CardTitle>
        <CardDescription>
          Choose your Unreal Engine project folder to connect to the MCP server
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="space-y-2">
            <Label htmlFor="project-path">Project Path</Label>
            <div className="flex space-x-2">
              <Input
                id="project-path"
                value={projectPath}
                onChange={(e) => setProjectPath(e.target.value)}
                placeholder="C:\Path\To\Your\UnrealProject"
                className="flex-1"
              />
              <Button type="button" variant="outline" onClick={handleBrowse}>
                <FolderOpen className="h-4 w-4 mr-2" />
                Browse
              </Button>
            </div>
          </div>

          {projectPath && !isValidPath && (
            <div className="text-sm text-red-500">
              MCP server not found at {projectPath}\Plugins\UnrealGenAISupport\Content\Python\mcp_server.py
            </div>
          )}

          {isValidPath && (
            <div className="text-sm text-green-500">
              MCP server found! Ready to connect.
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSave}
          disabled={!isValidPath}
          className="w-full"
        >
          Save Project Path
        </Button>
      </CardFooter>
    </Card>
  );
};
