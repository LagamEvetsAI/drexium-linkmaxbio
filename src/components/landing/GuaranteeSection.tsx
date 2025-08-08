
import { Shield, CheckCircle, Calendar, Scale } from "lucide-react";

export const GuaranteeSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-[#1a1a1a] to-[#0D0D0D]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
              Garantia Incondicional de 7 Dias
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Estamos confiantes na qualidade da nossa plataforma. Por isso, oferecemos uma garantia total de reembolso.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="text-black" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">100% Garantido</h3>
                  <p className="text-gray-300">
                    Se por qualquer motivo você não ficar satisfeito com a LinkMax.bio nos primeiros 7 dias, 
                    devolveremos 100% do valor pago, sem perguntas.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Processo Simples</h3>
                  <p className="text-gray-300">
                    Basta entrar em contato conosco através do suporte dentro da plataforma ou pelo 
                    email suporte@linkmax.bio dentro do prazo de 7 dias.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">7 Dias Completos</h3>
                  <p className="text-gray-300">
                    A contagem inicia a partir da data da sua primeira assinatura de um plano pago. 
                    Você tem 7 dias corridos para avaliar todos os recursos.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#2C2C2C] rounded-2xl p-8 border border-gray-700">
              <div className="text-center mb-6">
                <Scale className="text-[#FFD700] mx-auto mb-4" size={48} />
                <h3 className="text-2xl font-bold text-white mb-4">Termos Legais</h3>
              </div>
              
              <div className="space-y-4 text-sm text-gray-300">
                <div>
                  <h4 className="font-semibold text-white mb-2">Base Legal:</h4>
                  <p>
                    Esta garantia está fundamentada no Art. 49 do Código de Defesa do Consumidor (Lei 8.078/90), 
                    que assegura o direito de arrependimento em compras realizadas fora do estabelecimento comercial.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-white mb-2">Condições:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Válido apenas para planos pagos (Pro e Premium)</li>
                    <li>Solicitação deve ser feita em até 7 dias corridos</li>
                    <li>Reembolso processado em até 5 dias úteis</li>
                    <li>Não há cobrança de taxas administrativas</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-white mb-2">Contato:</h4>
                  <p>
                    Email: suporte@linkmax.bio<br />
                    Horário: Segunda a sexta, 9h às 18h (horário de Brasília)
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-green-100 text-center font-medium">
                  ✅ Garantia registrada e protegida pela legislação brasileira
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
