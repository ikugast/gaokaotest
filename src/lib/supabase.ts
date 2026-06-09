import { createClient } from "@supabase/supabase-js";
import type { AnswerProviderId, RemoteGradePayload } from "@/lib/types";

type GradeUserPaperRequest = {
  action: "grade-user-paper";
  paperId: string;
  answers: Record<string, string>;
};

type RunProviderPaperRequest = {
  action: "run-provider-paper";
  paperId: string;
  providerId: AnswerProviderId;
};

type GradePaperRequest = GradeUserPaperRequest | RunProviderPaperRequest;

let client: ReturnType<typeof createClient> | null = null;

function getSupabaseClient() {
  if (client) {
    return client;
  }

  const url = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("Supabase 尚未配置，请设置 VITE_SUPABASE_URL 和 VITE_SUPABASE_ANON_KEY。");
  }

  client = createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return client;
}

export async function invokeGradePaper(payload: GradePaperRequest) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.functions.invoke("grade-paper", {
    body: payload,
  });

  if (error) {
    throw new Error(error.message || "Supabase 函数调用失败。");
  }

  if (data?.error) {
    throw new Error(String(data.error));
  }

  return data as RemoteGradePayload;
}
