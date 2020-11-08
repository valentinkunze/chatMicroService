import { css, html, LitElement } from 'lit-element';
import '../components/AmenityBrowser.js';
import '../components/AmenityItem.js';

export class ResultsView extends LitElement {
  static get properties() {
    return {
      latitude: { type: String },
      longitude: { type: String },
      radius: { type: Number },
      results: { type: Array, attribute: false },
    };
  }

  constructor() {
    super();
    this.results = [];
  }

  static get styles() {
    return css`
      :host {
        width: 100%;
        display: flex;
        flex-direction: column;
      }

      amenity-browser {
        position: relative;
        overflow-y: auto;
        flex: 1;

        /* stretch to edges */
        margin-left: calc(var(--amenity-container-padding) * -1);
        margin-right: calc(var(--amenity-container-padding) * -1);
        margin-bottom: calc(var(--amenity-container-padding) * -1);
      }
    `;
  }

  render() {
    return html`
            <div>
        <h1>Results</h1>
        <p>
          Displaying results</strong> for
          <code>latitude</code> = <code>${this.latitude}</code>,
          <code>longitude</code> = <code>${this.longitude}</code> and
          <code>radius</code> = <code>${this.radius}</code>
        </p>
        <slot></slot>
      </div>
      <amenity-browser .amenities="${this.results}" .latitude="${this.latitude}" .longitude="${this.longitude}" .radius="${this.radius}"></amenity-browser>
    `;
  }
}

customElements.define('results-view', ResultsView);
