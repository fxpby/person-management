import { ref } from "vue";
import { useMutation } from "@tanstack/vue-query";
import { toast } from "@/utils/toastHelper";
import { resend as resendApi } from "@/services/apiResend";

export function useResend(email) {
  const resendCountdown = ref(60);
  const { mutate: resend, isPending: isResending } = useMutation({
    mutationKey: ["resendVerify"],
    mutationFn: () => {
      toast("Processing...", "info");
      return resendApi(email.value);
    },
    onSuccess: () => {
      toast("Verify code resend successfully", "success");
      resendCountdown.value = 60;
    },
    onError: (error) => {
      toast(error.message, "error");
    },
  });

  return { resendCountdown, resend, isResending };
}
