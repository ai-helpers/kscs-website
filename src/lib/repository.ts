import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const REPO_PATH = process.env.KS_CHEAT_SHEETS_PATH || '/tmp/cc-agent/59674227/ks-cheat-sheets';

export interface FileNode {
  path: string;
  name: string;
  type: 'file' | 'directory';
  children?: FileNode[];
}

export async function getFileContent(path: string): Promise<string> {
  const fullPath = join(REPO_PATH, path);
  return await readFile(fullPath, 'utf-8');
}

export async function getRepoStructure(): Promise<FileNode[]> {
  const files = await scanDirectory('');
  return buildTree(files);
}

async function scanDirectory(relativePath: string): Promise<FileNode[]> {
  const fullPath = join(REPO_PATH, relativePath);
  const entries = await readdir(fullPath, { withFileTypes: true });
  const files: FileNode[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;

    const entryPath = relativePath ? `${relativePath}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      const subFiles = await scanDirectory(entryPath);
      files.push(...subFiles);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push({
        path: entryPath,
        name: entry.name,
        type: 'file'
      });
    }
  }

  return files;
}

function buildTree(files: FileNode[]): FileNode[] {
  const root: FileNode[] = [];
  const directories = new Map<string, FileNode>();

  files.forEach(file => {
    const parts = file.path.split('/');
    let currentPath = '';

    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      const parentPath = currentPath;
      currentPath = currentPath ? `${currentPath}/${part}` : part;

      if (!directories.has(currentPath)) {
        const dirNode: FileNode = {
          path: currentPath,
          name: part,
          type: 'directory',
          children: []
        };
        directories.set(currentPath, dirNode);

        if (parentPath) {
          directories.get(parentPath)?.children?.push(dirNode);
        } else {
          root.push(dirNode);
        }
      }
    }

    if (currentPath) {
      directories.get(currentPath)?.children?.push(file);
    } else {
      root.push(file);
    }
  });

  return root;
}
