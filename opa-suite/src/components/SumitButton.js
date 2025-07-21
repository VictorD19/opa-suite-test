'use client'
import { useFormStatus } from 'react-dom'
import { Button } from './ui/button'

export function SubmitButton({ text }) {
    const { pending } = useFormStatus()

    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {text}
        </Button>
    )
}