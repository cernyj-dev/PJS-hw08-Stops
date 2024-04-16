// Set up window functions
require('../data/stops.js')
require('../hw-08-helper.js')
require('../hw-08.js');

const sleep = milis => new Promise(resolve => setTimeout(resolve, milis))

const reset = function () {
    document.body.innerHTML = `
            <div id="solution" style="margin-bottom: 50vh">
                <button id="loadData">Načíst data o zastávkách</button>
            </div>`;
    init();
}

describe('Data loading', () => {

    let loadButton;

    beforeAll(() => {
        reset();
        loadButton = document.getElementById('loadData');
        loadButton.click();
    });

    it('Disables button while loading', async () => {
        await sleep(100);
        expect(loadButton.disabled).toBeTruthy();
    })

    it('Changes button text', async () => {
        await sleep(1500);
        expect(loadButton.textContent).toEqual('Aktualizovat data o zastávkách');
    });

    it('Disables button again on reload', async () => {
        await sleep(1500);
        loadButton.click();
        await sleep(100);
        expect(loadButton.disabled).toBeTruthy();
    });
});

describe('Input handling', () => {

    let searchInput;
    let searchButton;

    beforeAll(async () => {
        reset();
        document.getElementById('loadData').click();
        await sleep(1200);
        searchInput = document.getElementById('searchInput');
        searchButton = document.getElementById('searchButton');
    });

    it('Shows search input and button after data load', () => {
        expect(searchInput.nodeType).toBe(Node.ELEMENT_NODE);
        expect(searchButton.textContent).toBe('Hledej!');
    });

    it('Has search button disabled by default', () => {
        expect(searchButton.disabled).toBeTruthy();
    });

    it('Enables search button when search entered', () => {
        searchInput.value = 'test';
        searchInput.dispatchEvent(new InputEvent('input'));
        expect(searchButton.disabled).toBeFalsy();
    });

    it('Disables search button when search removed', () => {
        searchInput.value = 'test';
        searchInput.dispatchEvent(new InputEvent('input'));
        searchInput.value = '';
        searchInput.dispatchEvent(new InputEvent('input'));
        expect(searchButton.disabled).toBeTruthy();
    });
});

describe('Search events', () => {

    let searchInput;
    let searchButton;

    beforeAll(async () => {
        reset();
        document.getElementById('loadData').click();
        await sleep(1200);
        searchInput = document.getElementById('searchInput');
        searchButton = document.getElementById('searchButton');
    });

    it('Does not search on empty search input', () => {
        searchInput.value = 'test';
        searchInput.dispatchEvent(new InputEvent('input'));
        searchInput.value = '';
        searchInput.dispatchEvent(new InputEvent('input'));
        searchInput.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
        const resultsDiv = document.getElementById('results');
        expect(resultsDiv?.textContent).toBeFalsy();
    });

    it('Searches on enter', () => {
        searchInput.value = 'test';
        searchInput.dispatchEvent(new InputEvent('input'));
        searchInput.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
        const resultsDiv = document.getElementById('results');
        expect(resultsDiv.textContent).toEqual('Žádné výsledky!')
    });

});

describe('Multiple results', () => {

    let searchInput;
    let searchButton;

    beforeAll(async () => {
        reset();
        document.getElementById('loadData').click();
        await sleep(1200);
        searchInput = document.getElementById('searchInput');
        searchButton = document.getElementById('searchButton');
    });

    it('Shows multiple results for "Dej"', () => {
        searchInput.value = 'Dej';
        searchInput.dispatchEvent(new InputEvent('input'));
        searchButton.click();
        const resultsDiv = document.getElementById('results');
        expect(resultsDiv.textContent).toContain('Měli jste na mysli:');
        expect(resultsDiv.textContent).toContain('Dejvická');
        expect(resultsDiv.textContent).toContain('Praha-Dejvice');
    });

    it('Shows multiple results for "1.1"', () => {
        searchInput.value = '1.1';
        searchInput.dispatchEvent(new InputEvent('input'));
        searchButton.click();
        const resultsDiv = document.getElementById('results');
        expect(resultsDiv.textContent).toContain('Měli jste na mysli:');
        expect(resultsDiv.textContent).toContain('Kovářov');
        expect(resultsDiv.textContent).toContain('Radomyšl');
    });

    it('Shows multiple results for " - "', () => {
        searchInput.value = ' - ';
        searchInput.dispatchEvent(new InputEvent('input'));
        searchButton.click();
        const resultsDiv = document.getElementById('results');
        expect(resultsDiv.textContent).toContain('Měli jste na mysli:');
        expect(resultsDiv.textContent).toContain('Nemocnice Bohnice - Divadlo Za plotem');
        expect(resultsDiv.textContent).toContain('Zoo Praha - Troja');
    });

    it('Shows no results for ".*"', () => {
        searchInput.value = '.*';
        searchInput.dispatchEvent(new InputEvent('input'));
        searchButton.click();
        const resultsDiv = document.getElementById('results');
        expect(resultsDiv.textContent).toEqual('Žádné výsledky!');
    });

    it('Allows to click into the single result', () => {
        searchInput.value = 'Dej';
        searchInput.dispatchEvent(new InputEvent('input'));
        searchButton.click();
        const resultsDiv = document.getElementById('results');
        resultsDiv.getElementsByTagName('a')[0].click();
        expect(resultsDiv.textContent).toContain('Dejvická');
        expect(resultsDiv.textContent).not.toContain('Praha-Dejvice');
    });
});

describe('Single result', () => {

    let searchInput;
    let searchButton;

    beforeAll(async () => {
        reset();
        document.getElementById('loadData').click();
        await sleep(1200);
        searchInput = document.getElementById('searchInput');
        searchButton = document.getElementById('searchButton');
    });

    it('Does not show stops picker for "Dejvická"', () => {
        searchInput.value = 'Dejvická';
        searchInput.dispatchEvent(new InputEvent('input'));
        searchButton.click();
        const resultsDiv = document.getElementById('results');
        expect(resultsDiv.textContent).not.toContain('Měli jste na mysli:');
    });

    it('Does not show stops picker for "jak"', () => {
        searchInput.value = 'jak';
        searchInput.dispatchEvent(new InputEvent('input'));
        searchButton.click();
        const resultsDiv = document.getElementById('results');
        expect(resultsDiv.textContent).not.toContain('Měli jste na mysli:');
        expect(resultsDiv.textContent).toContain('Sobotka');
    });

    it('Shows all platforms', () => {
        searchInput.value = 'Dejvická';
        searchInput.dispatchEvent(new InputEvent('input'));
        searchButton.click();
        const resultsDiv = document.getElementById('results');
        for (const platform of [...'ABVCDHWKJR'.split(''), 'M1', 'M2']) {
            expect(resultsDiv.textContent).toContain('Nástupiště ' + platform);
        }
    });

    it('Shows simple platform name', () => {
        searchInput.value = 'Praha-De';
        searchInput.dispatchEvent(new InputEvent('input'));
        searchButton.click();
        const resultsDiv = document.getElementById('results');
        expect(resultsDiv.textContent).toContain('Nástupiště');
        expect(resultsDiv.textContent).not.toContain('undefined');
    });

    it('Shows departures', () => {
        searchInput.value = 'Dejvická';
        searchInput.dispatchEvent(new InputEvent('input'));
        searchButton.click();
        const resultsDiv = document.getElementById('results');
        expect(resultsDiv.textContent).toContain('tram 20 ➔ Sídliště Barrandov');
        expect(resultsDiv.textContent).toContain('metro A ➔ Nemocnice Motol');
        expect(resultsDiv.textContent).toContain('bus 149 ➔ Stodůlky-Bavorská');
    });

    it('Links to the Google maps', () => {
        searchInput.value = 'Dejvická';
        searchInput.dispatchEvent(new InputEvent('input'));
        searchButton.click();
        const resultsDiv = document.getElementById('results');
        const links = [...resultsDiv.querySelectorAll('a')].map(link => link.href);
        expect(links).toContain('https://www.google.com/maps/place/50.10033,14.3914833')
        expect(links).toContain('https://www.google.com/maps/place/50.1005821,14.392684')
    });
});
