import { GradoForm, GradoTable, VerDetalleGradoModal } from '@/components/features/grado'
import { GestionarSeccionesModal } from '@/components/features/grado/GestionarSeccionModal'
import { ConfirmDialog } from '@/components/shared/ConfirmDialog'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  useCambiarEstadoGrado,
  useCrearGrado,
  useEditarGrado,
  useGrados,
} from '@/hooks/queries/useGrado'
import type { GradoFormValues } from '@/schemas/grado.schema'
import type { Grado } from '@/types/grado.types'
import {
  Eye,
  GraduationCap,
  Layers,
  Loader2,
  Pencil,
  Plus,
  ShieldCheck,
  ShieldOff,
} from 'lucide-react'
import { useState } from 'react'

export function GradoPage() {
  const { data: grados = [], isLoading, isError } = useGrados()
  const crearGrado = useCrearGrado()
  const editarGrado = useEditarGrado()
  const cambiarEstado = useCambiarEstadoGrado()
  const [formOpen, setFormOpen] = useState(false)
  const [gradoSeleccionado, setGradoSeleccionado] = useState<Grado | null>(null)
  const [abrirDetalle, setAbrirDetalle] = useState(false)
  const [gradoDetalle, setGradoDetalle] = useState<Grado | null>(null)
  const [abrirSecciones, setAbrirSecciones] = useState(false)
  const [gradoSecciones, setGradoSecciones] = useState<Grado | null>(null)
  const [confirmToggle, setConfirmToggle] = useState<Grado | null>(null)
  const [estadoFiltro, setEstadoFiltro] = useState<string>('todos')

  const gradosFiltrados =
    estadoFiltro === 'todos'
      ? grados
      : grados.filter((g) => (estadoFiltro === 'activo' ? g.estado : !g.estado))

  const handleCrear = () => {
    setGradoSeleccionado(null)
    setFormOpen(true)
  }

  const handleEditar = (grado: Grado) => {
    setGradoSeleccionado(grado)
    setFormOpen(true)
  }

  const handleDetalle = (grado: Grado) => {
    setGradoDetalle(grado)
    setAbrirDetalle(true)
  }

  const handleGestionarSecciones = (grado: Grado) => {
    setGradoSecciones(grado)
    setAbrirSecciones(true)
  }

  const handleFormSubmit = (values: GradoFormValues) => {
    if (gradoSeleccionado) {
      editarGrado.mutate(
        { id: gradoSeleccionado.id, values },
        { onSuccess: () => setFormOpen(false) },
      )
      return
    }

    crearGrado.mutate({ values }, { onSuccess: () => setFormOpen(false) })
  }

  const confirmarToggle = () => {
    if (!confirmToggle) return

    cambiarEstado.mutate(
      { id: confirmToggle.id, estado: !confirmToggle.estado },
      { onSuccess: () => setConfirmToggle(null) },
    )
  }

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-2 text-center">
        <GraduationCap className="size-10 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Error al cargar los periodos. Intenta recargar la página.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestión de Grados"
        description="Configura y administra los grados académicos y sus niveles."
        action={
          <Button onClick={handleCrear}>
            <Plus className="mr-2 size-4" />
            Nuevo Grado
          </Button>
        }
      />

      <GradoTable
        data={gradosFiltrados}
        isLoading={isLoading}
        filterSlot={
          <Select value={estadoFiltro} onValueChange={setEstadoFiltro}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="activo">Activo</SelectItem>
              <SelectItem value="inactivo">Inactivo</SelectItem>
            </SelectContent>
          </Select>
        }
        renderActions={(grado) => (
          <>
            <DropdownMenuItem onClick={() => handleDetalle(grado)}>
              <Eye className="mr-2 size-4" /> Ver Detalles
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEditar(grado)}>
              <Pencil className="mr-2 size-4" /> Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleGestionarSecciones(grado)}>
              <Layers className="mr-2 size-4" /> Gestionar Secciones
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setConfirmToggle(grado)}>
              {grado.estado ? (
                <>
                  <ShieldOff className="mr-2 size-4 text-destructive" /> Inhabilitar
                </>
              ) : (
                <>
                  <ShieldCheck className="mr-2 size-4" /> Habilitar
                </>
              )}
            </DropdownMenuItem>
          </>
        )}
      />

      <VerDetalleGradoModal
        open={abrirDetalle}
        onOpenChange={setAbrirDetalle}
        grado={gradoDetalle}
      />

      <GradoForm
        open={formOpen}
        onOpenChange={setFormOpen}
        grado={gradoSeleccionado}
        onSubmit={handleFormSubmit}
        isPending={crearGrado.isPending || editarGrado.isPending}
      />

      <GestionarSeccionesModal
        open={abrirSecciones}
        onOpenChange={setAbrirSecciones}
        grado={gradoSecciones}
      />

      <ConfirmDialog
        open={!!confirmToggle}
        onOpenChange={(open) => !open && setConfirmToggle(null)}
        title={confirmToggle?.estado ? 'Inhabilitar Grado' : 'Habilitar Grado'}
        description={
          confirmToggle?.estado
            ? `¿Estás seguro de inhabilitar "${confirmToggle?.nombre}"?`
            : `¿Deseas habilitar "${confirmToggle?.nombre}"?`
        }
        confirmText={confirmToggle?.estado ? 'Inhabilitar' : 'Habilitar'}
        onConfirm={confirmarToggle}
        variant={confirmToggle?.estado ? 'destructive' : 'default'}
      />
    </div>
  )
}
