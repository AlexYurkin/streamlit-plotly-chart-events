import streamlit as st
from . import plotly_chart_events
import plotly.express as px
import os
st.write(os.getcwd())

st.set_page_config(layout="wide")

st.subheader("Plotly Line Chart")
fig = px.line(x=[0, 1, 2, 3], y=[0, 1, 2, 3])
fig.update_layout(autosize=False, width=1500, height=500)
fig.update_traces(line_color='red')
plot_name_holder = st.empty()
clickedPoint = plotly_chart_events(fig, key="line")
plot_name_holder.write(f"Clicked Point: {clickedPoint}")

# Here we add columns to check auto-resize/etc
st.subheader("Plotly Bar Chart (With columns)")
_, c2, _ = st.columns((1, 6, 1))
with c2:
    fig2 = px.bar(x=[0, 1, 2, 3], y=[0, 1, 2, 3])
    plot_name_holder2 = st.empty()
    clickedPoint2 = plotly_chart_events(fig2, key="bar")
    plot_name_holder2.write(f"Clicked Point: {clickedPoint2}")

st.subheader("# Plotly Select Event")
fig3 = px.bar(x=[0, 1, 2, 3], y=[0, 1, 2, 3])
plot_name_holder3 = st.empty()
clickedPoint3 = plotly_chart_events(
    fig3, key="select", click_event=False, select_event=True
)
plot_name_holder3.write(f"Selected Point: {clickedPoint3}")

st.subheader("# Plotly Hover Event")
fig4 = px.bar(x=[0, 1, 2, 3], y=[0, 1, 2, 3])
plot_name_holder4 = st.empty()
clickedPoint4 = plotly_chart_events(
    fig4, key="hover", click_event=False, hover_event=True
)
plot_name_holder4.write(f"Hovered Point: {clickedPoint4}")
