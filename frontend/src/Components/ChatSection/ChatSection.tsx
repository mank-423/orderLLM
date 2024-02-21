import { FormEvent, useState } from "react";

type ConfirmationResponse = {
  status: string;
  response: {
    order: {
      item: string;
      quantity: number;
      price: number;
    }[];
    finalPrice: number;
  };
};

const ChatSection: React.FC = () => {
  const [msgAr, setMsgAr] = useState<string[]>([]);
  const [msg, setMsg] = useState<string>('');
  const [ai, setAi] = useState<string>('');
  const [confirmation, setConfirmation] = useState<ConfirmationResponse | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/api/generate/order', {
      method: 'POST',
      body: JSON.stringify({
        userPrompt: msg,
      }),
      headers: {
        'Content-type': 'application/json',
      }
    });

    const result = await response.json();
    console.log(result);
    
    setMsgAr(prevMsgAr => [...prevMsgAr, msg, result.response]);
    setAi(result.response);
  };

  console.log(ai)
  const handleOrderConfirm = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/generate/confirm', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          orderStatement: ai,
        })
      });

      const data: ConfirmationResponse = await response.json();
      setConfirmation(data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="">
      <div>
        {/* Area for displaying message */}
        <div className="bg-white">
          {msgAr.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </div>

        {/* Confirm order */}
        <div>
          <button onClick={handleOrderConfirm} className="bg-white border-2">
            Submit order
          </button>
        </div>

        {/* Area for input of message  */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <input
            type="submit"
            value="Submit"
            className="bg-white"
          />
        </form>

        {/* Confirmation */}
        <div>
          {confirmation && (
            <div>
              <h1>Status: {confirmation.status}</h1>
              <h2>Response:</h2>
              <pre>{JSON.stringify(confirmation.response, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ChatSection;
