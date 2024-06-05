import FormQueue from '../components/FormQueue'

const PageQueueNew = () => {
  return (
    <div className="mx-auto grid max-w-2xl gap-4">
      <h1 className="text-2xl font-bold md:text-4xl">New queue</h1>
      <FormQueue buttonLabel="Create Queue" />
    </div>
  )
}

export default PageQueueNew
