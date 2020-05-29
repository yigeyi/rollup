const assert = require('assert');
const path = require('path');

function getId(name) {
	return path.resolve(__dirname, `${name}.js`);
}

module.exports = {
	description: 'provides additional chunk information to a manualChunks function',
	options: {
		external: 'external',
		manualChunks(id, { getModuleIds, getModuleInfo }) {
			assert.deepStrictEqual(
				[...getModuleIds()],
				[getId('main'), 'external', getId('lib'), getId('dynamic')]
			);
			assert.deepStrictEqual(
				[...getModuleIds()].map(id => getModuleInfo(id)),
				[
					{
						dynamicImporters: [],
						dynamicallyImportedIds: [getId('dynamic')],
						hasModuleSideEffects: true,
						id: getId('main'),
						implicitDependants: [],
						implicitDependencies: [],
						importers: [],
						importedIds: [getId('lib'), 'external'],
						isEntry: true,
						isExternal: false
					},
					{
						dynamicImporters: [getId('dynamic')],
						dynamicallyImportedIds: [],
						hasModuleSideEffects: true,
						id: 'external',
						implicitDependants: [],
						implicitDependencies: [],
						importers: [getId('main')],
						importedIds: [],
						isEntry: false,
						isExternal: true
					},
					{
						dynamicImporters: [],
						dynamicallyImportedIds: [],
						hasModuleSideEffects: true,
						id: getId('lib'),
						implicitDependants: [],
						implicitDependencies: [],
						importers: [getId('dynamic'), getId('main')],
						importedIds: [],
						isEntry: false,
						isExternal: false
					},
					{
						dynamicImporters: [getId('main')],
						dynamicallyImportedIds: ['external'],
						hasModuleSideEffects: true,
						id: getId('dynamic'),
						implicitDependants: [],
						implicitDependencies: [],
						importers: [],
						importedIds: [getId('lib')],
						isEntry: false,
						isExternal: false
					}
				]
			);
		}
	}
};
