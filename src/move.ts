// Please update this type as same as with the data shape.
type IFile = {
  id: string;
  name: string;
};

type Folder = {
  id: string;
  name: string;
  files: IFile[];
};

type List = Folder[];

export default function move(list: List, source: string, destination: string): List {
  let sourceFolderIndex;
  let sourceFileIndex;
  const newList = [...list];

  list.forEach((folder) => {
    const fileIndex = folder.files.findIndex((file) => file.id === source);

    if (fileIndex !== -1) {
      sourceFileIndex = fileIndex;
      sourceFolderIndex = list.indexOf(folder);
    }
  });

  if (sourceFolderIndex !== undefined && sourceFileIndex !== undefined) {
    const destinationIndex = newList.findIndex((folder) => folder.id === destination);

    if (destinationIndex !== -1) {
      const sourceFolder = list[sourceFolderIndex];

      newList[destinationIndex].files.push(sourceFolder.files[sourceFileIndex]);
      newList[sourceFolderIndex].files = sourceFolder.files.filter((file) => file.id !== source);
    } else {
      throw new Error('You cannot specify a file as the destination');
    }
  } else {
    throw new Error('You cannot move a folder');
  }
  return newList;
}
