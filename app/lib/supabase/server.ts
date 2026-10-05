import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseEnv } from "./env";
export async function createClient(){const cookieStore=await cookies();const env=getSupabaseEnv();return createServerClient(env.NEXT_PUBLIC_SUPABASE_URL,env.NEXT_PUBLIC_SUPABASE_ANON_KEY,{cookies:{getAll(){return cookieStore.getAll()},setAll(items){try{items.forEach(({name,value,options})=>cookieStore.set(name,value,options))}catch{}}}});}
