// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Templates {
    mapping(string => string[]) templates;
    mapping(string => bool) isTemplateExists;
    string[] names;

    function ListTemplates() public view returns (string[] memory) {
        return names;
    }

    function AddTemplate(string memory name, string[] memory keys) public {
        require(!isTemplateExists[name], "Already exist");

        isTemplateExists[name] = true;
        templates[name] = keys;
        names.push(name);
    }

    function DeleteTemplate(string memory name) public {
        require(isTemplateExists[name], "Not exist");

        isTemplateExists[name] = false;
        delete templates[name];

        string[] memory _templateNames = names;
        for (uint i = 0; i < _templateNames.length; i++) {
            if (keccak256(abi.encodePacked(_templateNames[i])) == keccak256(abi.encodePacked(name))) {
                uint lastIndex = _templateNames.length - 1;
                string memory last = names[lastIndex];
                names[i] = last;
                names.pop();
            }
        }
    }

    function AppendTemplateKeys(string memory name, string[] memory keys) public {
        for (uint i = 0; i < keys.length; i++) {
            templates[name].push(keys[i]);
        }
    }

    function RemoveTemplateKeys(string memory name, string[] memory keys) public {
        string[] memory rawKeys = templates[name];

        for (uint i = 0; i < keys.length; i++) {
            for (uint j = 0; j < rawKeys.length; j++) {
                if (keccak256(abi.encodePacked(keys[i])) == keccak256(abi.encodePacked(rawKeys[j]))) {
                    uint lastIndex = rawKeys.length - 1;
                    string memory last = rawKeys[lastIndex];
                    templates[name][i] = last;
                    templates[name].pop();
                }
            }
        }
    }

    function GetTemplate(string memory name) public view returns (string[] memory) {
        require(templates[name].length > 0, "unexist");
        return templates[name];
        // string[] memory tmpKeys = new string[](templates[name].length);
        // uint validLen = 0;

        // string[] memory rawKeys = templates[name];
        // for (uint i = 0; i < rawKeys.length; i++) {
        //     if (bytes(rawKeys[i]).length > 0) {
        //         tmpKeys[validLen] = rawKeys[i];
        //         validLen++;
        //     }
        // }

        // string[] memory keys = new string[](validLen);
        // for (uint i = 0; i < validLen; i++) {
        //     keys[i] = tmpKeys[i];
        // }
        // return keys;
    }
}
