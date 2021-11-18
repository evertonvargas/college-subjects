import { createClient } from "@supabase/supabase-js";
import getConfig from 'next/config'

const {publicRuntimeConfig} = getConfig()
const {SUPABASE_URL, SUPABASE_SECRET_KEY} = publicRuntimeConfig


export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_SECRET_KEY
)

