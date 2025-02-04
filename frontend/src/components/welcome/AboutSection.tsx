import React from 'react';
import { Plane as Plant2, Droplets, TrendingUp, Users } from 'lucide-react';

export function AboutSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">À Propos d'EcoCrop</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            EcoCrop est votre partenaire dans la transformation de l'agriculture marocaine vers des pratiques plus durables et productives. Notre plateforme combine expertise agricole et technologie de pointe pour optimiser vos cultures.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plant2 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Agriculture Intelligente</h3>
            <p className="text-gray-600">
              Optimisez vos cultures grâce à des recommandations basées sur l'intelligence artificielle
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Droplets className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Gestion de l'Eau</h3>
            <p className="text-gray-600">
              Réduisez votre consommation d'eau tout en maximisant les rendements
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Optimisation Continue</h3>
            <p className="text-gray-600">
              Améliorez constamment vos pratiques grâce à des analyses en temps réel
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Communauté Agricole</h3>
            <p className="text-gray-600">
              Rejoignez une communauté d'agriculteurs engagés dans l'agriculture durable
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}