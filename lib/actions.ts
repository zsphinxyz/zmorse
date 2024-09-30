'use server'

import { revalidatePath } from "next/cache";

export async function guessWord(formData: FormData) {
  const guess = formData.get('guess') as string;


}
