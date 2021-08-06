import { FormEvent, useCallback, useState } from "react"
import { SearchResults } from "../components/SearchResults";

interface ResultProps {
  totalPrice: number;
  data: any;
}

export default function Home() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<ResultProps>({
    totalPrice: 0,
    data: []
  });

  const priceFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    const products = data.map(product => {
        return {
          id: product.id,
          title: product.title,
          price: product.price,
          priceFormatted: priceFormatted.format(product.price)
        }
    })

    const totalPrice = data.reduce((total, product) => {
          return total + product.price;
    }, 0)

    setResults({totalPrice, data: products});
  }

  const addToWishList = useCallback(async (id: number) => {
    console.log(id)
  }, []);

  return (
    <div>
      <h1>Search</h1>
      <form onSubmit={handleSearch}>
        <input type="text" value={search} onChange={e => {setSearch(e.target.value)}}/>
        <button type="submit">buscar</button>
      </form>

      <SearchResults 
        onAddToWishList= {addToWishList}
        results={results.data}
        totalPrice={results.totalPrice}
        />
        
    </div>
  )
}
