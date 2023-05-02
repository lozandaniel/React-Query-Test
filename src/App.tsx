import './App.css'
import { useQuery } from 'react-query'

const delay = async (es: number) =>
  await new Promise((resolve) => setTimeout(resolve, es))

function App() {
  const fetchNumberRandom = async () => {
    await delay(1000)
    const res = await fetch(
      'http://www.randomnumberapi.com/api/v1.0/random?min=1&max=500&count=1'
    )
    const data = res.json()
    return data
  }

  const query = useQuery(['number'], fetchNumberRandom, {
    refetchOnWindowFocus: false,
  })

  return (
    <>
      <h1>Random number with using the library React-Query</h1>
      {query.isFetching ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          Random Number: <b>{query.data}</b>
        </div>
      )}

      {!query.isLoading && query.isError && (
        <p>Hay un error en el sistema.</p>
      )}

      <button onClick={() => query.refetch()} disabled={query.isFetching}>
        {query.isFetching ? '...' : 'View New Number'}
      </button>
    </>
  )
}

export default App
