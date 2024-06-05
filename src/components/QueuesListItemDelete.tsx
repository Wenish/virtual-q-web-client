import React from 'react'

const QueuesListItemDelete: React.FC<{
  item: { name: string; id: number }
  onItemDelete?: (id: number) => void
}> = ({ item, onItemDelete }) => {
  const modalId = `queues-list-item-delete-modal-${item.id}`

  const getModalElement: (id: string) => HTMLDialogElement | null = (
    id: string
  ) => {
    const element = document.getElementById(id)
    if (!element) return null
    return document.getElementById(id) as HTMLDialogElement
  }

  const onDelete = () => {
    getModalElement(modalId)?.close()
    if (onItemDelete) {
      onItemDelete(item.id)
    }
  }

  return (
    <>
      <button onClick={() => getModalElement(modalId)?.showModal()}>
        Delete queue
      </button>
      <dialog
        id={modalId}
        className="modal grid h-full items-center justify-center"
      >
        <div className="modal-box grid gap-4">
          <div>
            <h3 className="text-lg font-bold">Confirm delete</h3>
            <p className="break-all text-lg font-bold">{item.name}</p>
          </div>
          <div className="grid grid-cols-2 justify-between gap-4">
            <form method="dialog">
              <button className="btn btn-outline btn-sm">Cancel</button>
            </form>
            <div className="grid justify-end">
              <button onClick={onDelete} className="btn btn-error btn-sm">
                Confirm
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default QueuesListItemDelete
