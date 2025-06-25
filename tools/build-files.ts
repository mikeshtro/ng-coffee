import { lstatSync, readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

import type { DirectoryNode, FileNode, FileSystemTree } from '@webcontainer/api';

const courses = readdirSync('src/files');
for (const course of courses) {
  const chapters = readdirSync(`src/files/${course}`);

  if (!existsSync(`public/${course}`)) {
    mkdirSync(`public/${course}`);
  }

  for (const chapter of chapters) {
    const result: FileSystemTree = {};
    parseDirectory(chapter, result, `src/files/${course}`);
    writeFileSync(`public/${course}/${chapter}.json`, JSON.stringify(result));
  }
}

function parseDirectory(name: string, tree: FileSystemTree, pathPrefix: string): void {
  const fullPath = join(pathPrefix, name);
  const contents = readdirSync(fullPath);

  for (const content of contents) {
    const contentFullPath = join(fullPath, content);
    const stat = lstatSync(contentFullPath);
    if (stat.isDirectory()) {
      const directoryNode: DirectoryNode = { directory: {} };
      parseDirectory(content, directoryNode.directory, fullPath);
      tree[content] = directoryNode;
    } else if (stat.isFile()) {
      parseFile(content, tree, fullPath);
    }
  }
}

function parseFile(name: string, tree: FileSystemTree, pathPrefix: string): void {
  const fullPath = join(pathPrefix, name);
  const fileContent = readFileSync(fullPath).toString();

  const fileNode: FileNode = { file: { contents: fileContent } };
  tree[name] = fileNode;
}
