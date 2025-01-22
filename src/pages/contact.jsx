
export default function Contact() {
    return (
      <div className="container mx-auto p-5 max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Contactez-nous</h1>
        <p className="text-lg text-center mb-4">
          Comment pouvons-nous vous aider ? Trouvez des réponses à toutes vos questions.
        </p>
  
        {/* Online Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">En ligne</h2>
          <p className="text-gray-700">
            À partir d-une adresse mail :{" "}
            <a
              href="mailto:support@fragranceforu.com"
              className="text-blue-500 hover:underline"
            >
              support@Parfums.com
            </a>
          </p>
        </div>
  
        {/* Phone Section */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Par téléphone</h2>
          <p className="text-gray-700">
            À partir d-un mobile ou du fixe :{" "}
            <a
              href="tel:0661231772"
              className="text-blue-500 hover:underline"
            >
              06 -0- 23 -0- 72
            </a>
          </p>
        </div>
      </div>
    );
  }
  