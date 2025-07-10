import LogoUploader from '../components/LogoUploader';

export default function TestUploader() {
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Subir logo sin login</h1>
      <LogoUploader onUpload={(url) => alert('Logo subido a: ' + url)} />
    </div>
  );
}
