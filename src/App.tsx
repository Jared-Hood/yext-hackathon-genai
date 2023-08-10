import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useState } from 'react';
import Hero from './components/Hero';
import ResultInfo, { RequestType } from './components/ResultInfo';
import APIResponse from './components/APIResponse';
import LoadingSpinner from './components/LoadingSpinner';
import RequestError from './components/ErrorResponse';
import { YextAPIResponse } from './types';
import { fetchAIResponse } from './fetchData';
import EntityList from './components/EntityList';
import { fetchAIChatResponse } from './fetchDataChat';
import ChatMessages from './components/ChatMessages';

interface AIResponse {
  url?: string;
  method?: RequestType;
  body?: Record<string, any>;
  message: string;
}

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppInternal />
    </QueryClientProvider>
  )
}

interface UserChatMessage {
  author: "user";
  content: string;
}

interface BotChatMessage {
  author: "bot";
  content: AIResponse;
}

export type ChatMessage  = UserChatMessage | BotChatMessage;

function AppInternal() {
  const [apiKey, setApiKey] = useState("c57aa11769201ea2e65d85b21758445e");
  const [prompt, setPrompt] = useState("");
  const [AILoading, setAILoading] = useState(false);

  const [prediction, setPrediction] = useState<AIResponse>();
  const [requestURL, setRequestURL] = useState("");

  const [resp, setResp] = useState<any>();
  const [error, setError] = useState<any>();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messagesToSend, setMessagesToSend] = useState<any[]>([]);

  const { data: allEntities, isFetching } = useQuery({
    queryKey: ["api_request", resp],
    queryFn: async () => fetchAll(),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const handleSubmit = async () => {
    setAILoading(true);
    const userMessage: UserChatMessage = {
      author: "user",
      content: prompt,
    };

    const updatedMessages: ChatMessage[] = [...messagesToSend, userMessage];
    setMessages(m => [...m, userMessage]);
    setMessagesToSend(m => [...m, userMessage]);

    const chatResponse = await fetchAIChatResponse(apiKey, updatedMessages);
    console.log(chatResponse);
    const parsedChatResponse: AIResponse = JSON.parse(chatResponse.predictions[0].candidates[0].content);
    console.log(parsedChatResponse);

    setMessages(m => [...m, {
      author: "bot",
      content: parsedChatResponse,
    }]);
    setMessagesToSend(m => [...m, {
      author: "bot",
      content: JSON.stringify(parsedChatResponse)
    }]);

    setPrompt("");

    if (parsedChatResponse.url && parsedChatResponse.method) {
      try {
        const data = await fetchWithProxy(parsedChatResponse.url, parsedChatResponse.method, parsedChatResponse.body);
        setResp(data);
        setRequestURL(parsedChatResponse.url);
        setPrediction(parsedChatResponse);
        setAILoading(false);
        setError(null);
      } catch (error) {
        console.error("AI returned invalid URL");
        setAILoading(false);
        setError(error);
      }
    }

    setAILoading(false);
  }

  return (
    <div className='container'>
      <Hero />
      <div className='relative'>
        <div className='flex flex-col w-[500px]'>
          <input
            className='border border-black mb-2 px-4 py-2 rounded-sm'
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            placeholder='Add api key'
          />
          <div className='flex flex-col'>
            <input
              className='border border-black mb-2 px-4 py-2 rounded-sm'
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder='Prompt'
            />
            <button onClick={handleSubmit} disabled={!apiKey || !prompt}
              className="disabled:bg-gray-200 bg-green-200 hover:bg-green-300 px-4 py-2 rounded-sm w-[fit-content]"
            >
              Submit
            </button>
          </div>
        </div>
        <ChatMessages messages={messages} />
        <ResultInfo
          requestType={prediction?.method}
          requestURL={requestURL}
          requestBody={prediction?.body}
        />
        {error && <RequestError error={error} />}
        {resp && <APIResponse data={resp} />}
        <EntityList entities={allEntities?.response?.entities} />
        {(isFetching || AILoading) && <LoadingSpinner />}
      </div>
    </div>
  );
}

export default App

async function fetchWithProxy(url: string, method: string, body?: Record<string, any>) {
  const response = await fetch("https://main-blindly--square--shrimp-pgsdemo-com.preview.pagescdn.com/proxy", {
    method: "POST",
    body: JSON.stringify({
      url,
      method,
      body,
    }),
  });
  const data = await response.json();
  return data;
}

async function fetchAll() {
  try {
    const response = await fetch("https://main-blindly--square--shrimp-pgsdemo-com.preview.pagescdn.com/proxy", {
      method: "POST",
      body: JSON.stringify({
        url: "https://api.yextapis.com/v2/accounts/me/entities?v=20230808&api_key=c57aa11769201ea2e65d85b21758445e",
        method: "GET",
      })
    });
    const data = await response.json();
    return data as YextAPIResponse;
  } catch (error: any) {
    throw new Error(error);
  }
}

// If there is an unresolvable error make sure to display as such so it doesn't brake without indication.
// https://hitchhikers.yext.com/docs/contentdeliveryapis/introduction/errors#status-codes
