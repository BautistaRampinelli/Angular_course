import pandas as pd
import plotly.express as px
import matplotlib.pyplot as plt
from math import pi
import logging

# Configuración del log
logging.basicConfig(filename='copa_libertadores_2025.log', level=logging.INFO, format='%(asctime)s - %(message)s')
logging.info("Inicio de la simulación de la Copa Libertadores 2025")

# Datos de la Fase de Grupos
fase_grupos = {
    'Grupo': ['A', 'A', 'A', 'A', 'B', 'B', 'B', 'B', 'C', 'C', 'C', 'C', 'D', 'D', 'D', 'D'],
    'Equipo': ['River Plate', 'LDU Quito', 'Sporting Cristal', 'Carabobo',
               'Flamengo', 'Independiente del Valle', 'Universitario', 'Atlético Bucaramanga',
               'Palmeiras', 'Estudiantes de La Plata', 'Deportivo Táchira', 'Central Córdoba',
               'Boca Juniors', 'Olimpia', 'Fortaleza', 'San Antonio Bulo Bulo'],
    'Pts': [14, 10, 5, 1, 13, 11, 6, 0, 16, 9, 7, 1, 12, 10, 7, 1],
    'PJ': [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    'G': [4, 3, 1, 0, 4, 3, 2, 0, 5, 3, 2, 0, 3, 3, 2, 0],
    'E': [2, 1, 2, 1, 1, 2, 0, 0, 1, 0, 1, 1, 3, 1, 1, 1],
    'P': [0, 2, 3, 5, 1, 1, 4, 6, 0, 3, 3, 5, 0, 2, 3, 5],
    'GF': [12, 9, 6, 3, 11, 10, 7, 2, 14, 8, 6, 4, 10, 9, 7, 3],
    'GC': [4, 6, 10, 10, 5, 6, 9, 15, 3, 7, 9, 13, 4, 7, 8, 10],
    'DIF': [8, 3, -4, -7, 6, 4, -2, -13, 11, 1, -3, -9, 6, 2, -1, -7]
}
df_grupos = pd.DataFrame(fase_grupos)

# Log de la Fase de Grupos
logging.info("Resultados de la Fase de Grupos:")
logging.info(df_grupos.to_string())

# Datos de las Fases Eliminatorias
fases_eliminatorias = {
    'Fase': ['Octavos de Final', 'Octavos de Final', 'Octavos de Final', 'Octavos de Final',
             'Cuartos de Final', 'Cuartos de Final', 'Semifinales', 'Final'],
    'Equipo 1': ['LDU Quito', 'Estudiantes de La Plata', 'Olimpia', 'Internacional',
                 'River Plate', 'Palmeiras', 'Boca Juniors', 'River Plate'],
    'Equipo 2': ['Flamengo', 'River Plate', 'Palmeiras', 'Boca Juniors',
                 'Flamengo', 'Boca Juniors', 'River Plate', 'São Paulo'],
    'Resultado': ['1-3', '3-3 (River avanza por goles de visitante)', '1-2', '2-3',
                  '3-2', '1-2', '1-2', '2-1']
}
df_fases = pd.DataFrame(fases_eliminatorias)

# Log de las Fases Eliminatorias
logging.info("Resultados de las Fases Eliminatorias:")
logging.info(df_fases.to_string())

# Datos de los Goleadores
goleadores = {
    'Jugador': ['Pedro', 'Julián Álvarez', 'Jonathan Calleri', 'Miguel Borja', 'Germán Cano'],
    'Equipo': ['Flamengo', 'River Plate', 'São Paulo', 'River Plate', 'Fluminense'],
    'Goles': [7, 6, 6, 5, 5]
}
df_goleadores = pd.DataFrame(goleadores)

# Log de Goleadores
logging.info("Tabla de Goleadores:")
logging.info(df_goleadores.to_string())

# Diagrama de Gantt de las Fases del Torneo
fases_torneo = {
    'Fase': ['Fase de Grupos', 'Octavos de Final', 'Cuartos de Final', 'Semifinales', 'Final'],
    'Inicio': ['2025-02-01', '2025-05-01', '2025-06-01', '2025-07-01', '2025-08-01'],
    'Fin': ['2025-04-30', '2025-05-31', '2025-06-30', '2025-07-31', '2025-08-15']
}
df_fases_torneo = pd.DataFrame(fases_torneo)

fig_gantt = px.timeline(df_fases_torneo, x_start="Inicio", x_end="Fin", y="Fase", title="Calendario de la Copa Libertadores 2025")
fig_gantt.update_yaxes(categoryorder="total ascending")
fig_gantt.update_layout(xaxis_title="Fecha", yaxis_title="Fase del Torneo")
fig_gantt.show()

# Gráfico de Goleadores
fig_goleadores, ax_goleadores = plt.subplots()
ax_goleadores.barh(df_goleadores['Jugador'], df_goleadores['Goles'], color='skyblue')
ax_goleadores.set_xlabel('Goles')
ax_goleadores.set_ylabel('Jugador')
ax_goleadores.set_title('Máximos Goleadores de la Copa Libertadores 2025')
plt.gca().invert_yaxis()
plt.show()

# Gráfico de Radar de Desempeño de Equipos
equipos = ['River Plate', 'Flamengo', 'Palmeiras', 'Boca Juniors']
categorias = ['Goles a Favor', 'Goles en Contra', 'Partidos Ganados', 'Partidos Perdidos']
valores = [
    [12, 4, 4, 0],  # River Plate
    [11, 5, 4, 1],  # Flamengo
    [14, 3, 5, 0],  # Palmeiras
    [10, 4, 3, 0]   # Boca Juniors
]

N = len(categorias)
angles = [n / float(N) * 2 * pi for n in range(N)]
angles += angles[:1]

fig, ax = plt.subplots(figsize=(8, 8), subplot_kw=dict(polar=True))
for i, equipo in enumerate(equipos):
    vals = valores[i] + valores[i][:1]
    ax.plot(angles, vals, linewidth=2, linestyle='solid', label=equipo)
    ax.fill(angles, vals, alpha=0.25)

plt.xticks(angles[:-1], categorias)
ax.set_rlabel_position(0)
plt.yticks([5, 10, 15], ["5", "10", "15"], color="grey", size=7)
plt.ylim(0, 15)
plt.legend(loc='upper right', bbox_to_anchor=(0.1, 0.1))
plt.title('Desempeño Comparativo de Equipos en la Copa Libertadores 2025', size=15, color='blue', y=1.1)
plt.show()

logging.info("Simulación completada exitosamente.")
