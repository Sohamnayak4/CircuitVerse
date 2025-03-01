/* eslint-disable class-methods-use-this */
import { Controller } from '@hotwired/stimulus';

const featureRestrictionMetadata = {
    Simulator: [
        'Combinational Analysis Tool',
        'Verilog tools',
    ],
    Project: [
        'Copy / Paste',
        'Allow Collaborators',
    ],
};

const featureRestrictionsMap = (restrictions) => {
    const map = {};
    for (let i = 0; i < restrictions.length; i++) {
        map[restrictions[i]] = true;
    }
    return map;
};

const htmlRowFeatureName = (name) => `<h6 class="circuit-element-category"> ${name} </h6>`;

const htmlInlineFeatureCheckbox = (elementName, checked) => `
    <div class="form-check form-check-inline">
        <label class="form-check-label primary-checkpoint-container" id="label-${elementName}" for="checkbox-${elementName}">
            <input class="form-check-input feature-restriction" type="checkbox" id="checkbox-${elementName}" value="${elementName}" ${checked}>
            <div class="primary-checkpoint"></div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${elementName}
        </label>
    </div>`;

const generateFeatureRow = (name, elements, restrictionMap) => {
    let html = htmlRowFeatureName(name);
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const checked = restrictionMap[element] ? 'checked' : '';
        html += htmlInlineFeatureCheckbox(element, checked);
    }
    return html;
};

const loadFeatureHtml = (featureHierarchy, restrictionMap) => {
    Object.entries(featureHierarchy).forEach(([category, elements]) => {
        const html = generateFeatureRow(category, elements, restrictionMap);
        $('.restricted-feature-list').append(html);
    });
};

const loadFeatureRestrictions = () => {
    const featureRestrictionMap = featureRestrictionsMap(featureRestrictionMetadata);
    loadFeatureHtml(featureRestrictionMetadata, featureRestrictionMap);
};

export default class extends Controller {
    handleFeatureMainCheckbox() {
        const radio = document.getElementById('restrict-feature').checked;
        document.querySelector('.restricted-feature-list').style.display = radio ? 'none' : 'block';
    }

    connect() {
        loadFeatureRestrictions();
    }
}