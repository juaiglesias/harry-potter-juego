import { useLayoutEffect, useRef } from 'react'
import { Button } from './Button'
import './ModalConfirmacion.css'

interface ModalConfirmacionProps {
  pregunta: string
  textoConfirmar: string
  /** Foco inicial en el botón de confirmar; si no, va a "Cancelar". */
  enfocarConfirmar?: boolean
  onConfirmar: () => void
  onCancelar: () => void
}

/**
 * Modal de confirmación sobre `<dialog>` nativo. Montarlo lo abre y
 * desmontarlo lo cierra. Escape cierra el diálogo y dispara `close`, que se
 * trata como cancelar; el click en el fondo no hace nada.
 */
export function ModalConfirmacion({
  pregunta,
  textoConfirmar,
  enfocarConfirmar = false,
  onConfirmar,
  onCancelar,
}: ModalConfirmacionProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const confirmarRef = useRef<HTMLButtonElement>(null)
  const cancelarRef = useRef<HTMLButtonElement>(null)
  // El evento close es asíncrono: marca los cierres propios del cleanup para
  // no tomarlos como cancelar. En desarrollo StrictMode desmonta y vuelve a
  // montar el efecto, y ese close cerraba el modal recién abierto.
  const cierrePropioRef = useRef(false)

  // Layout effect: el cleanup corre antes de que React saque el <dialog> del
  // DOM, así close() devuelve el foco al elemento que lo tenía al abrir.
  useLayoutEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (!dialog.open) dialog.showModal()
    // showModal() mueve el foco al primer botón: se elige después de abrir.
    ;(enfocarConfirmar ? confirmarRef : cancelarRef).current?.focus()
    return () => {
      if (dialog.open) {
        cierrePropioRef.current = true
        dialog.close()
      }
    }
  }, [enfocarConfirmar])

  function alCerrar() {
    if (cierrePropioRef.current) {
      cierrePropioRef.current = false
      return
    }
    onCancelar()
  }

  return (
    <dialog ref={dialogRef} className="modal-confirmacion" onClose={alCerrar}>
      <p className="modal-confirmacion__pregunta">{pregunta}</p>
      <div className="modal-confirmacion__acciones">
        <Button ref={cancelarRef} variant="secondary" onClick={onCancelar}>
          Cancelar
        </Button>
        <Button ref={confirmarRef} onClick={onConfirmar}>
          {textoConfirmar}
        </Button>
      </div>
    </dialog>
  )
}
