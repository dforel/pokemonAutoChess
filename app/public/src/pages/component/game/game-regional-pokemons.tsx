import React from "react"
import { useTranslation } from "react-i18next"
import { Tooltip } from "react-tooltip"
import { getPokemonData } from "../../../../../models/precomputed/precomputed-pokemon-data"
import { RarityColor, RarityCost } from "../../../../../types/Config"
import { Pkm } from "../../../../../types/enum/Pokemon"
import { selectCurrentPlayer, useAppSelector } from "../../../hooks"
import SynergyIcon from "../icons/synergy-icon"
import { getCachedPortrait } from "./game-pokemon-portrait"

export function GameRegionalPokemonsIcon() {
  return (
    <div className="my-box" style={{ padding: "5px" }}>
      <img
        src={`assets/ui/regional.png`}
        style={{ width: "2em", height: "2em" }}
        data-tooltip-id={"game-regional-pokemons"}
      />
      <Tooltip
        id="game-regional-pokemons"
        float
        place="top"
        className="custom-theme-tooltip"
      >
        <GameRegionalPokemons />
      </Tooltip>
    </div>
  )
}

export function GameRegionalPokemons() {
  const { t } = useTranslation()
  const currentPlayer = useAppSelector(selectCurrentPlayer)
  const regionalPokemons: Pkm[] = (currentPlayer?.regionalPokemons ?? new Array<Pkm>()).slice().sort((a, b) => {
    return RarityCost[getPokemonData(a).rarity] - RarityCost[getPokemonData(b).rarity]
  })

  if (!regionalPokemons || regionalPokemons.length === 0) {
    return (
      <div className="game-regional-pokemons">
        <p className="help">{t("regional_pokemon_hint")}</p>
      </div>
    )
  } else {
    return (
      <div className="game-regional-pokemons">
        <h2>{t("regional_pokemons")}</h2>
        <p className="help">{t("regional_pokemon_hint")}</p>
        <div className="grid">
          {regionalPokemons.map((p, index) => {
            const pokemon = getPokemonData(p)
            const rarityColor = RarityColor[pokemon.rarity]

            return (
              <div
                className="my-box clickable game-pokemon-portrait"
                key={"game-regional-pokemons-" + index}
                style={{
                  backgroundColor: rarityColor,
                  borderColor: rarityColor,
                  backgroundImage: `url("${getCachedPortrait(pokemon.index, currentPlayer?.pokemonCustoms)}")`
                }}
              >
                <ul className="game-pokemon-portrait-types">
                  {Array.from(pokemon.types.values()).map((type) => {
                    return (
                      <li key={type}>
                        <SynergyIcon type={type} />
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
