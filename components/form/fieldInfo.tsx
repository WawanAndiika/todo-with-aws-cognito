import { FieldApi } from "@tanstack/react-form"

const FieldInfo = ({ field }: { field: FieldApi<any, any, any, any> }) => {
  return (
    <p className="text-[0.8rem] font-medium text-destructive mt-1">
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        field.state.meta.errors.join(',')
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </p>
  )
}

export default FieldInfo;