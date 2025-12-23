import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[SEND-PURCHASE-EMAIL] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (!resendKey) throw new Error("RESEND_API_KEY is not set");

    const resend = new Resend(resendKey);

    const { purchaseId, customerEmail, customerName, productData } = await req.json();
    logStep("Request data", { purchaseId, customerEmail, customerName });

    if (!customerEmail) {
      throw new Error("Customer email is required");
    }

    const productName = productData?.name || "Jemson Backdrops Collection";
    const downloadUrl = productData?.download_url || "";
    const whatsappUrl = productData?.whatsapp_group_url || "";
    const videoUrl = productData?.video_tutorial_url || "";

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Obrigado pela sua compra!</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 12px; margin-top: 20px; margin-bottom: 20px;">
    
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="color: #1a1a1a; font-size: 28px; margin: 0;">🎉 Obrigado pela sua compra!</h1>
      <p style="color: #666; font-size: 16px; margin-top: 10px;">Olá ${customerName || 'Cliente'}!</p>
    </div>

    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 25px; border-radius: 12px; margin-bottom: 25px;">
      <h2 style="color: #fff; margin: 0 0 10px 0; font-size: 20px;">📦 Seu Produto</h2>
      <p style="color: #fff; margin: 0; font-size: 18px; font-weight: bold;">${productName}</p>
    </div>

    ${downloadUrl ? `
    <div style="text-align: center; margin-bottom: 25px;">
      <a href="${downloadUrl}" style="display: inline-block; background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: #fff; padding: 16px 40px; border-radius: 50px; text-decoration: none; font-size: 18px; font-weight: bold; box-shadow: 0 4px 15px rgba(17, 153, 142, 0.4);">
        📥 BAIXAR ARQUIVOS
      </a>
    </div>
    ` : ''}

    ${videoUrl ? `
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 12px; margin-bottom: 25px;">
      <h3 style="color: #1a1a1a; margin: 0 0 10px 0;">🎬 Tutorial em Vídeo</h3>
      <p style="color: #666; margin: 0 0 15px 0;">Aprenda como usar seus novos backdrops:</p>
      <a href="${videoUrl}" style="color: #667eea; font-weight: bold; text-decoration: none;">Assistir Tutorial →</a>
    </div>
    ` : ''}

    ${whatsappUrl ? `
    <div style="background-color: #dcf8c6; padding: 20px; border-radius: 12px; margin-bottom: 25px;">
      <h3 style="color: #1a1a1a; margin: 0 0 10px 0;">💬 Grupo Exclusivo WhatsApp</h3>
      <p style="color: #666; margin: 0 0 15px 0;">Entre no nosso grupo para suporte e novidades:</p>
      <a href="${whatsappUrl}" style="display: inline-block; background-color: #25d366; color: #fff; padding: 12px 25px; border-radius: 50px; text-decoration: none; font-weight: bold;">Entrar no Grupo</a>
    </div>
    ` : ''}

    <div style="background-color: #fff3cd; padding: 20px; border-radius: 12px; margin-bottom: 25px;">
      <h3 style="color: #856404; margin: 0 0 10px 0;">📋 Como Usar</h3>
      <ol style="color: #856404; margin: 0; padding-left: 20px;">
        <li style="margin-bottom: 8px;">Baixe os arquivos usando o botão acima</li>
        <li style="margin-bottom: 8px;">Extraia o arquivo ZIP</li>
        <li style="margin-bottom: 8px;">Abra no Photoshop e siga o tutorial</li>
        <li>Entre no grupo do WhatsApp para suporte</li>
      </ol>
    </div>

    <div style="text-align: center; padding-top: 20px; border-top: 1px solid #eee;">
      <p style="color: #999; font-size: 14px; margin: 0;">
        Dúvidas? Responda este email ou entre no grupo do WhatsApp.
      </p>
      <p style="color: #999; font-size: 12px; margin-top: 15px;">
        © ${new Date().getFullYear()} Jemson Backdrops. Todos os direitos reservados.
      </p>
    </div>
  </div>
</body>
</html>
    `;

    const emailResponse = await resend.emails.send({
      from: "Jemson Backdrops <onboarding@resend.dev>",
      to: [customerEmail],
      subject: `🎉 Sua compra foi confirmada - ${productName}`,
      html: emailHtml,
    });

    logStep("Email sent successfully", { emailResponse });

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
