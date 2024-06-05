import React, { ChangeEvent, useState } from 'react'

const TicketsListItemChangeStatus: React.FC<{
  item: { id: number; number: number; status: number }
  onStatusChange?: (id: number, newStatus: number) => void
}> = ({ item, onStatusChange }) => {
  const [selectedStatusOption, setSelectedStatusOption] = useState(item.status)

  const handleChangeSelectedStatus = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedStatusOption(parseInt(event.target.value, 10))
  }

  const selectStatusOptions = [
    {
      value: 1,
      label: 'new',
    },
    {
      value: 2,
      label: 'in progress',
    },
    {
      value: 3,
      label: 'done',
    },
  ]

  const modalId = `tickets-list-item-change-status-modal-${item.id}`

  const getModalElement: (id: string) => HTMLDialogElement | null = (
    id: string
  ) => {
    const element = document.getElementById(id)
    if (!element) return null
    return document.getElementById(id) as HTMLDialogElement
  }

  const onDelete = () => {
    getModalElement(modalId)?.close()
    const hasStatusChanged = item.status != selectedStatusOption
    if (!hasStatusChanged) return
    if (onStatusChange) {
      onStatusChange(item.id, selectedStatusOption)
    }
  }

  const onCancel = () => {
    getModalElement(modalId)?.close()
    setSelectedStatusOption(item.status)
  }

  return (
    <>
      <button onClick={() => getModalElement(modalId)?.showModal()}>
        Change ticket status
      </button>
      <dialog
        id={modalId}
        className="modal grid h-full items-center justify-center"
      >
        <div className="modal-box grid gap-4">
          <div>
            <h3 className="text-lg font-bold">Change Status</h3>
            <p className="break-all text-lg font-bold">Ticket {item.number}</p>
          </div>
          <div>
            <select
              className="select select-primary w-full max-w-xs"
              value={selectedStatusOption}
              onChange={handleChangeSelectedStatus}
            >
              {selectStatusOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 justify-between gap-4">
            <div>
              <button onClick={onCancel} className="btn btn-outline btn-sm">
                Cancel
              </button>
            </div>
            <div className="grid justify-end">
              <button onClick={onDelete} className="btn btn-error btn-sm">
                Change status
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default TicketsListItemChangeStatus
