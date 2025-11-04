import { getRepoStructure, getFileContent, type FileNode } from './repository';

export interface SearchIndexItem {
  path: string;
  title: string;
  content: string;
  preview: string;
}

function extractAllFiles(nodes: FileNode[]): FileNode[] {
  const files: FileNode[] = [];

  for (const node of nodes) {
    if (node.type === 'file') {
      files.push(node);
    } else if (node.children) {
      files.push(...extractAllFiles(node.children));
    }
  }

  return files;
}

function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/\[(.+?)\]\(.+?\)/g, '$1')
    .replace(/`(.+?)`/g, '$1')
    .replace(/\n+/g, ' ')
    .trim();
}

function getTitle(filePath: string, content: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  if (match) {
    return match[1].trim();
  }

  const pathParts = filePath.split('/');
  const fileName = pathParts[pathParts.length - 1];
  return fileName.replace('.md', '');
}

function createPreview(content: string, maxLength: number = 150): string {
  const stripped = stripMarkdown(content);
  if (stripped.length <= maxLength) {
    return stripped;
  }
  return stripped.substring(0, maxLength).trim() + '...';
}

export async function buildSearchIndex(): Promise<SearchIndexItem[]> {
  const structure = await getRepoStructure();
  const files = extractAllFiles(structure);
  const index: SearchIndexItem[] = [];

  for (const file of files) {
    try {
      const content = await getFileContent(file.path);
      const title = getTitle(file.path, content);
      const stripped = stripMarkdown(content);
      const preview = createPreview(content);

      index.push({
        path: `/doc/${file.path}`,
        title,
        content: stripped.toLowerCase(),
        preview
      });
    } catch (error) {
      console.error(`Failed to index ${file.path}:`, error);
    }
  }

  return index;
}
