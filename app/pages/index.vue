<template>
  <div class="container mx-auto min-h-svh max-w-5xl px-2">
    <div class="flex flex-col items-center gap-8 py-12 lg:flex-row">
      <div class="flex-1">
        <h1 class="text-primary mb-4 text-4xl font-bold">
          Bienvenue à la Cité Universitaire: Où Savoir et Vivre se Rencontrent
        </h1>
        <p class="text-muted-foreground mb-4">
          Découvrez un environnement dynamique où la communauté étudiante
          prospère, offrant une expérience d'apprentissage enrichissante et des
          opportunités de croissance personnelle."
        </p>

        <Card>
          <CardContent>
            <div
              class="flex w-full items-center justify-around space-x-4 text-sm"
            >
              <div>
                <p class="text-foreground text-base">
                  Localisation
                  <br />
                  <span class="text-muted-foreground text-sm">
                    Paris, France
                  </span>
                </p>
              </div>
              <Separator orientation="vertical" />
              <div>
                <p class="text-foreground text-base">
                  Étudiants
                  <br />
                  <span class="text-muted-foreground text-sm">
                    580 étudiants
                  </span>
                </p>
              </div>
              <Separator orientation="vertical" />
              <div>
                <p class="text-foreground text-base">
                  Logements
                  <br />
                  <span class="text-muted-foreground text-sm">
                    150 chambres
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div class="w-full shrink-0 lg:w-[350px]">
        <NuxtImg
          src="/images/illustrations/building-visual.jpg"
          alt="Lumièrebourg"
          class="h-64 w-full rounded-lg object-cover lg:h-auto"
          width="350"
          height="400"
        />
      </div>
    </div>

    <LMap
      style="height: 400px; border-radius: 0.25rem; margin-bottom: 3rem"
      :zoom="12"
      :center="[48.8566, 2.3522]"
      :use-global-leaflet="false"
    >
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        layer-type="base"
        name="OpenStreetMap"
      />
      <LMarker :lat-lng="[48.8566, 2.3522]" />
    </LMap>
  </div>
</template>

<script setup lang="ts"></script>
