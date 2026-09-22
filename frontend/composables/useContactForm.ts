import { ref } from 'vue'
export function useContactForm() {
  const api = useApi()
  const sending = ref(false)
  const sent = ref(false)
  const error = ref('')
  async function submit(payload: { name: string; email: string; message: string; subject?: string }) {
    sending.value = true; error.value = ''
    try { await api.post('/contact', payload); sent.value = true } catch { error.value = 'Não foi possível enviar agora. Tente novamente em instantes.' } finally { sending.value = false }
  }
  return { sending, sent, error, submit }
}
