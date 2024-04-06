import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const PageHome = () => {
    const url = `${import.meta.env.VITE_HOST_API}`
    const { isPending, error, data } = useQuery({
        queryKey: ['testData'],
        queryFn: () =>
          axios
            .get(url)
            .then((res) => res.data),
      })

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (
        <div className="grid gap-4">
            Hello from Page Home {JSON.stringify(data)}
            <button className="btn">Button</button>
        </div>
    )
}

export default PageHome
