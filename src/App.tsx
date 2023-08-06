import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useState } from 'react';
import Hero from './components/Hero';
import ResultInfo from './components/ResultInfo';
import APIResponse from './components/APIResponse';
import LoadingSpinner from './components/LoadingSpinner';
import RequestError from './components/ErrorResponse';
import { YextAPIResponse } from './types';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppInternal />
    </QueryClientProvider>
  )
}

function AppInternal() {
  const [requestURL, setRequestURL] = useState("https://liveapi.yext.com/v2/accounts/me/entities/geosearch?api_key=a76f3747d89260bdebb2c3223cffe03e&entityTypes=location&limit=4&radius=50&savedFilterIds=1246936843&v=20220927&location=40.7416944%2C-74.0056597&filter=%7B%22meta.id%22%3A%7B%22%21%24eq%22%3A%22test-location%22%7D%7D");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["api_request", requestURL],
    queryFn: async () => fetchURL(requestURL),
    enabled: !!requestURL,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className='container'>
      <Hero />
      <div className='relative'>
        <ResultInfo
          group='Content Delivery'
          groupLink='https://hitchhikers.yext.com/docs/contentdeliveryapis/introduction/overview-policies-and-conventions/'
          endpoint='Entities: List'
          endpointDescription='Retrieve a list of Entities within an account'
          requestType='POST'
          requestURL={requestURL}
          requestionBody={{
            fields: [
              123,
              456
            ],
            limit: 10,
            name: "test name"
          }}
        />
        {isError && <RequestError error={error} />}
        {data && <APIResponse data={data} />}
        {isLoading && <LoadingSpinner />}
      </div>
    </div>
  );
}

export default App

async function fetchURL(url: string) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data as YextAPIResponse;
  } catch (error: any) {
    throw new Error(error);
  }
}

// If there is an unresolvable error make sure to display as such so it doesn't brake without indication.
// https://hitchhikers.yext.com/docs/contentdeliveryapis/introduction/errors#status-codes
