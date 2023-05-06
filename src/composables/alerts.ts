import Swal, { SweetAlertIcon } from "sweetalert2"

const Alerts = {
  validation: () => {
    Swal.fire('Validación', 'Por favor verifique los campos indicados con rojo.', 'error')
  },
  custom_validation: (message: string) => {
    Swal.fire('Validación', message, 'error')
  },
  create: () => {
    Swal.fire('', 'Creación exitosa!', 'success')
  },
  update: () => {
    Swal.fire('', 'Edición exitosa!', 'success')
  },
  destroy: (module: string, id: string | number) => {
    Swal.fire('', `${module} #${id} eliminad@!`, 'info')
  },
  saved_permissions: () => {
    Swal.fire('', 'Permisos guardados!', 'success')
  },
  send_failed: (message: string) => {
    Swal.fire('Error en Servidor', message, 'warning')
  },
  custom: (title: string, html: string, icon: SweetAlertIcon) => {
    return Swal.fire(title, html, icon)
  },
  general: (message: string) => {
    Swal.fire('Éxito', message, 'success')
  },
  error: (message: string) => {
    Swal.fire('Aviso!', message, 'error')
  },
}

export default Alerts