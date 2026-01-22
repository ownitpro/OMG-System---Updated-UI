export default function Upload(){
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-zinc-100">Upload</h1>
      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
        <p className="text-sm mb-4 text-zinc-300">Choose files to upload. This is a mock dropzone; no files leave your machine.</p>
        <input type="file" multiple className="block w-full max-w-lg text-zinc-300" />
        <div className="text-xs text-zinc-500 mt-3">Chunking/AV/OCR pipeline will appear once AWS is wired.</div>
      </div>
    </div>
  );
}

