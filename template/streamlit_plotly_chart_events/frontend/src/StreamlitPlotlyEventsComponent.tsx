import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"
import React, { ReactNode } from "react"
import Plot from 'react-plotly.js';

/**
 * This is a React-based component template. The `render()` function is called
 * automatically when your component should be re-rendered.
 */
class StreamlitPlotlyEventsComponent extends StreamlitComponentBase {

  public render = (): ReactNode => {
    // Arguments that are passed to the plugin in Python are accessible
    // via `this.props.args`.
    // Pull Plotly object from args and parse
    const plot_obj = JSON.parse(this.props.args["plot_obj"]);
    const override_height = this.props.args["override_height"];
    const override_width = this.props.args["override_width"];
    // Event booleans
    const click_event = this.props.args["click_event"];
    const select_event = this.props.args["select_event"];
    const hover_event = this.props.args["hover_event"];

    // Streamlit sends us a theme object via props that we can use to ensure
    // that our component has visuals that match the active theme in a
    // streamlit app.
    const { theme } = this.props
    const style: React.CSSProperties = {}

    // Maintain compatibility with older versions of Streamlit that don't send
    // a theme object.
    if (theme) {
      // Use the theme object to style our button border. Alternatively, the
      // theme style is defined in CSS vars.

    }
    
    return (
      <Plot
        data={plot_obj.data}
        layout={plot_obj.layout}
        config={plot_obj.config}
        frames={plot_obj.frames}
        onClick={click_event ? this.plotlyEventHandler : function(){}}
        onSelected={this.plotlyEventHandler}
        onDoubleClick={() => this.plotlyEventHandler(undefined)}
        onHover={hover_event ? this.plotlyEventHandler : function(){}}
        className="stPlotlyChart"
        style={{width: override_width, height: override_height}}
      />
    )
  }


  /** Click handler for plot. */
  private plotlyEventHandler = (data: any) => {
    // Build array of points to return
    var clickedPoints: Array<any> = [];
    if (data) {
      data.points.forEach(function (arrayItem: any) {
        clickedPoints.push({
          x: arrayItem.x,
          y: arrayItem.y,
          curveNumber: arrayItem.curveNumber,
          pointNumber: arrayItem.pointNumber,
          pointIndex: arrayItem.pointIndex
        })
      });
    }
    // Return array as JSON to Streamlit
    Streamlit.setComponentValue(JSON.stringify(clickedPoints))
  }
}

// "withStreamlitConnection" is a wrapper function. It bootstraps the
// connection between your component and the Streamlit app, and handles
// passing arguments from Python -> Component.
//
// You don't need to edit withStreamlitConnection (but you're welcome to!).
export default withStreamlitConnection(StreamlitPlotlyEventsComponent)
