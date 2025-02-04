import type { Soil, OptimizationResult, Plot } from "../types/optimization"

export function optimizeResources(soil: Soil): OptimizationResult {
  // This is a simplified optimization logic. In a real-world scenario,
  // you would use more complex algorithms to determine the optimal allocation.

  const optimizedPlots: Plot[] = soil.plots.map((plot) => {
    // Simple optimization: increase area for profitable crops, decrease for less profitable
    const profitPerHectare = plot.currentProfit / plot.area
    const optimizationFactor = profitPerHectare > 1000 ? 1.1 : 0.9

    return {
      ...plot,
      area: Math.min(plot.area * optimizationFactor, soil.totalArea * 0.5), // Cap at 50% of total area
      waterUsage: plot.waterUsage * optimizationFactor,
      currentProfit: plot.currentProfit * optimizationFactor,
    }
  })

  const totalProfit = optimizedPlots.reduce((sum, plot) => sum + plot.currentProfit, 0)
  const totalWaterUsage = optimizedPlots.reduce((sum, plot) => sum + plot.waterUsage, 0)

  const suggestions = generateSuggestions(soil, optimizedPlots)

  return {
    optimizedPlots,
    totalProfit,
    totalWaterUsage,
    suggestions,
  }
}

function generateSuggestions(soil: Soil, optimizedPlots: Plot[]): string[] {
  const suggestions: string[] = []

  optimizedPlots.forEach((optimizedPlot, index) => {
    const originalPlot = soil.plots[index]
    if (optimizedPlot.area > originalPlot.area) {
      suggestions.push(
        `Consider increasing the area for ${optimizedPlot.cropType} by ${(optimizedPlot.area - originalPlot.area).toFixed(2)} ha.`,
      )
    } else if (optimizedPlot.area < originalPlot.area) {
      suggestions.push(
        `Consider decreasing the area for ${optimizedPlot.cropType} by ${(originalPlot.area - optimizedPlot.area).toFixed(2)} ha.`,
      )
    }
  })

  if (optimizedPlots.reduce((sum, plot) => sum + plot.waterUsage, 0) > soil.waterAllocated) {
    suggestions.push("Consider implementing water-saving irrigation techniques to optimize water usage.")
  }

  return suggestions
}

