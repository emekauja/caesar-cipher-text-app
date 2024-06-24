import './App.css';
import { Button } from './components/forms/button/button';
import { Input } from './components/forms/input/input';

function App() {
  return (
    <>
      <h1 className="text-2xl"> Caesar Cipher Text Encryption App </h1>
      <div className="w-full flex items-center justify-center mt-6">
        <div className="flex items-center justify-center space-x-3 w-72">
          <Input type="text" placeholder="Enter a text to encrypt" />{' '}
          <Button text="Encrypt" />
        </div>
      </div>
    </>
  );
}

export default App;
