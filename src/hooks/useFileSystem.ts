import Directory from "@/lib/filesystem/directory";
import File from "@/lib/filesystem/file";

const FileSystem = () => {
  const root = new Directory("root");
  const home = new Directory("home");
  const guest = new Directory("guest");
  const documents = new Directory("documents");
  const downloads = new Directory("downloads");

  root.add(home);

  home.add(guest);

  guest.add(documents);
  guest.add(downloads);

  documents.add(new File("resume.txt", "This is my resume."));
  downloads.add(new File("photo.jpg", "Binary data..."));

  
  console.log(root.toString());
}

// export default FileSystem;

FileSystem()