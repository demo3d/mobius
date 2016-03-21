mobius.controller('nodeTypesCtrl',['$scope','$rootScope','nodeCollection','consoleMsg',
    function($scope,$rootScope,nodeCollection,consoleMsg){

    $scope.selectAll = false;

    $scope.typeList = JSON.parse(localStorage.mobiusNodeTypes);

    $scope.$watch(function(){return localStorage.mobiusNodeTypes}, function(){
        $scope.typeList = JSON.parse(localStorage.mobiusNodeTypes);
    });

    $scope.remove = function(scope){
        scope.remove();
    };

    $scope.removeInput = function(scope){
        scope.remove();
    };

    $scope.toggle = function(scope) {
        scope.toggle();
    };

    // select all
    $scope.toggleSelection = function(){
        if($scope.selectAll === true){
            for(var i = 0; i< $scope.typeList.length; i++){
                $scope.typeList[i].checked = false;
            }
            $scope.selectAll = false;
        } else {
            for (var i = 0; i < $scope.typeList.length; i++) {
                $scope.typeList[i].checked = true;
            }
            $scope.selectAll = true;
        }
    };

    $scope.closeTypeManager = function(){
        document.getElementById('typeManager').style.display = 'none'
    };

    // delete
    // fixme add confirmation
    $scope.deleteChecked = function(){
        var deleteList = [];
        for(var i = 0; i< $scope.typeList.length; i++){
            if($scope.typeList[i].checked === true){
                deleteList.push($scope.typeList[i].nodeType)
            }
        }
        nodeCollection.deleteNodeType(deleteList);
    };

    // import single/multiple nodes from a single file
    // fixme error handle
    // fixme duplication of name
    $scope.importNode = function(files){
        var jsonString;

        for(var i = 0; i < files.length ; i ++ ){
            var f = files[i];

            var reader = new FileReader();

            reader.onload = (function () {

                return function (e) {
                    if(f.name.split('.').pop() === 'json') {

                        jsonString = e.target.result;
                        var objectString =  jsonString.split('\n');

                        var existingTypes = [];
                        for(var j = 0; j < $scope.typeList.length; j++){
                            existingTypes.push($scope.typeList[j].nodeType);
                        }
                        // install new imported node into nodeCollection
                        for(var i = 0; i < objectString.length - 1;i++){
                            var newType = JSON.parse(objectString[i]);
                            if(existingTypes.indexOf(newType.nodeType) === -1){
                                nodeCollection.importNodeType(newType);
                                existingTypes.push(newType.nodeType);
                            }
                        }
                        // when updating data outside angular need to apply digest cycle
                        $scope.$apply();

                        // fixme consoleMsg is not visible in type manager
                        consoleMsg.confirmMsg('nodeImport');
                    }else{
                        // fixme consoleMsg is not visible in type manager
                        consoleMsg.errorMsg('invalidFileType');
                    }
                };
            })(f);

            reader.readAsText(f);
        }
        document.getElementById("importNode").value = "";
    };

    // export node
    $scope.exportNode = function (){
        var jsonString = "";
        var types = JSON.parse(localStorage.mobiusNodeTypes);
        for(var i = 0; i< $scope.typeList.length; i++){
            if($scope.typeList[i].checked === true){
                jsonString = jsonString.concat(JSON.stringify(types[i]),'\n');
            }
        }

        var blob = new Blob([jsonString],{type:"application/json"});
        $scope.nodeUrl = URL.createObjectURL(blob);
    };

    $scope.$watch('typeList',function(){
        $scope.definition = $scope.getSelectedProcedureModel();
        $scope.arguments = $scope.getSelectedInterfaceModel();
        $scope.jsCode = $scope.generateCode();
    },true);

    $scope.getSelectedProcedureModel = function (){
        for(var i = 0; i < $scope.typeList.length;i++){
            if($scope.typeList[i].selected === true){
                return $scope.typeList[i].procedureDataModel;
            }
        }
    };

    $scope.getSelectedInterfaceModel = function (){
        for(var i = 0; i < $scope.typeList.length;i++){
            if($scope.typeList[i].selected === true){
                return $scope.typeList[i].interfaceDataModel;
            }
        }
    };

    $scope.definition = $scope.getSelectedProcedureModel();

    $scope.arguments = $scope.getSelectedInterfaceModel();

    // only there is checked item then toggle export nodes
    // fixme warning
    // fixme directly from javascript
    $scope.existSelected = function(){
        for(var i = 0; i< $scope.typeList.length; i++){
          if(  $scope.typeList[i].checked === true){
              return true;
          }
        }
    };

    // methods types
    $scope.getMethods = function(){
        var props = Object.getOwnPropertyNames(MOBIUS);

        for(var i =0; i < props.length;i++){
            if(props[i] === 'dataConversion'){
                props.splice(i, 1);
            }
        }
        var expression = [{category:'msc',name:'expression'}];

        for(var i = 0; i < props.length; i++){
            if(typeof MOBIUS[props[i]] != 'function'){
                var subProps = Object.getOwnPropertyNames(MOBIUS[props[i]]);
                for(var j = 0; j < subProps.length; j++){
                    if(typeof MOBIUS[props[i]][subProps[j]] == 'function'){
                        expression.push({category:props[i],
                            name:subProps[j],
                            return:MOBIUS[props[i]][subProps[j]].prototype.return});
                    }
                }
            }
        }
        return expression;
    };

    $scope.methods = $scope.getMethods();

    // control types
    $scope.controlTypes = ['for each', 'if else'];

    // add item to select node type
    $scope.newItem = function(cate,subCate,isCopy,content) {
        $scope.currentHighestId = 0;
        // fixme error handling
        //try{
            //finding adding position
            var selectedPos = undefined;
            var selectedParent = undefined;
            var insertPos = undefined;
            var insertIndex = undefined;

            function findSelected (tree){
                for(var i = 0; i < tree.length; i++ ){
                    if(tree[i].selected === true){
                        selectedPos  = tree[i];
                        selectedParent = tree;
                    }else if(tree[i].nodes){
                        findSelected(tree[i].nodes)
                    }
                }
            }

            findSelected($scope.definition);

            if(selectedPos !== undefined){
                if(selectedPos.title === 'Data' ||
                    selectedPos.title === 'Output' ||
                    selectedPos.title === 'Action' ||
                    (selectedPos.title === 'Control' && selectedPos.controlType === 'if else')||
                    isCopy === true){
                    // insert below the select
                    insertIndex = selectedParent.indexOf(selectedPos) + 1;
                }
                else if((selectedPos.title === 'Control' && selectedPos.controlType === 'if') ||
                    (selectedPos.title === 'Control' && selectedPos.controlType === 'else') ||
                    (selectedPos.title === 'Control' && selectedPos.controlType === 'for each')){
                    // insert inside the selected
                    insertPos = selectedPos.nodes;
                }
            }
            else{
                // no procedure is selected
                insertPos = $scope.definition;
            }

            // if copy
            if(isCopy && isCopy === true){
                selectedParent.splice(insertIndex,0,content);
            }
            // if direct adding
            else if(cate === 'Data'){
                var dataObj = {
                    id: $scope.maxId($scope.definition)  + 1,
                    title:  'Data',
                    nodes: [],
                    dataName:undefined,
                    dataValue:undefined,
                    // create new variable or assign value to existing variable
                    type:undefined
                };

                if(insertIndex !== undefined){
                    selectedParent.splice(insertIndex,0,dataObj);
                }else{
                    insertPos.push(dataObj);
                }
            }

            else if(cate === 'Output'){
                var outputObj = {
                    id:$scope.maxId($scope.definition) + 1,
                    title: 'Output'
                };

                if(insertIndex !== undefined){
                    selectedParent.splice(insertIndex,0,outputObj);
                }else{
                    insertPos.push(outputObj);
                }

                //$scope.chartViewModel.nodes[$scope.nodeIndex].addOutputConnector(outputObj);
            }
            // todo update node flatten func
            else if(cate === "Function"){
                var functionObj = {
                    id:$scope.maxId($scope.typeL[ist$scope.getSelectedIndex()]) + 1,
                    title: 'Function',
                    name: 'FUNC_OUTPUT',
                    dataValue:undefined,
                    type:undefined
                };

                if(insertIndex !== undefined){
                    selectedParent.splice(insertIndex,0,outputObj);
                }else{
                    insertPos.push(outputObj);
                }

                //$scope.chartViewModel.nodes[$scope.nodeIndex].addOutputConnector(outputObj);
            }

            else if(cate === 'Action'){
                var parameters = [];
                var result;
                var expression;

                if(subCate.name === 'print' || subCate.name === 'expression'){
                    result = undefined;
                }else{
                    result = '';
                }

                if(subCate.name !== 'expression'){
                    var paraList = getParamNames(MOBIUS[subCate.category][subCate.name]);
                    for(var j = 0; j< paraList.length; j++){
                        parameters.push({value:'',type:paraList[j]});
                    }
                }

                var actionObj = {
                    id: $scope.maxId($scope.definition)  + 1,
                    title:  'Action',
                    nodes: [],
                    type:undefined,
                    expression:'',
                    method:subCate.name,
                    category:subCate.category,
                    return:subCate.return,
                    parameters:parameters,
                    result:result,
                    dataName:undefined
                };

                if(insertIndex !== undefined){
                    selectedParent.splice(insertIndex,0,actionObj);
                }else{
                    insertPos.push(actionObj);
                }

            } else if(cate === 'Control'){
                switch(subCate){
                    case 'for each':
                        var forObj ={
                            id: $scope.maxId($scope.definition) + 1,
                            title:  'Control',
                            nodes: [],
                            type:undefined,
                            controlType: subCate,
                            dataName:undefined,
                            forList:undefined
                        };

                        if(insertIndex !== undefined){
                            selectedParent.splice(insertIndex,0,forObj);
                        }else{
                            insertPos.push(forObj);
                        }
                        break;

                    case 'if else':
                        var ifObj = {
                            id: $scope.maxId($scope.definition)  + 1,
                            title:  'Control',
                            nodes: [
                                {
                                    id: $scope.maxId($scope.definition) + 1,
                                    title:  'Control',
                                    controlType:'if',
                                    nodes: [],
                                    ifExpression:undefined

                                },
                                {
                                    id: $scope.maxId($scope.definition) + 1,
                                    title:  'Control',
                                    controlType:'else',
                                    nodes: []
                                }
                            ],
                            controlType: subCate
                        };

                        if(insertIndex !== undefined){
                            selectedParent.splice(insertIndex,0,ifObj);
                        }else{
                            insertPos.push(ifObj);
                        }
                        break;
                }
            }
        //}
        //catch(err){
        //    consoleMsg.errorMsg('noNode');
        //}

        // auto scroll
        var procedureDiv = document.getElementById("tree-root-procedure-type");
        setTimeout(function(){
            procedureDiv.scrollTop = procedureDiv.scrollHeight;},0);
    };

    // add new item in interface
    $scope.newInterface = function(cate) {
        // fixme error handling
        //try{
            if(cate === 'Input'){

                var inputObj = {
                    id:$scope.arguments.length + 1,
                    title: 'Input',
                    name: undefined,
                    connected:false,
                    dataValue:undefined,
                    type:undefined,
                    option:{
                        name:'none'
                    },
                    color:'#000000',
                    menuOptionText:undefined
                };

                $scope.arguments.push(
                    inputObj
                );
            }
        //}
        //catch(err){
        //    consoleMsg.errorMsg('noNode');
        //}

        //autoscroll
        var argumentDiv = document.getElementById("tree-root-parameter-type");
        setTimeout(function(){argumentDiv.scrollTop = argumentDiv.scrollHeight;},0);
    };

    // interface design options
    $scope.interfaceOptions = [{name:'none'},
        {name:'slider'},
        {name:'dropdown'},
        {name:'color picker'}];

    $scope.menuOptions = function (menuOptionText) {
        if(menuOptionText){
            return menuOptionText.split(",");
        }else{
            return [];
        }
    };

    $scope.currentHighestId = 0;

    $scope.maxId = function(tree){
        if(tree.length > 0){
            for(var i = 0; i < tree.length; i++){
                if(tree[i].id > $scope.currentHighestId && tree.id !== 999){
                    $scope.currentHighestId = tree[i].id;
                }
                if(tree[i].nodes){
                    $scope.maxId(tree[i].nodes);
                }
            }
        }

        return $scope.currentHighestId;
    };

    // procedure items to track
    $scope.selectedParentItem = undefined;
    $scope.selectedPos = undefined;
    $scope.selectedParent = undefined;

    $scope.findSelectedProcedure = function (tree){
        for(var i = 0; i < tree.length; i++ ){
            if(tree[i].selected === true){

                $scope.selectedPos  = tree[i];
                $scope.selectedParent = tree;
                $scope.root = false;

            }else if(tree[i].nodes){
                $scope.findSelectedProcedure(tree[i].nodes);
                $scope.selectedParentItem = tree[i];
            }
        }
    };

    // to find the parent item recursively
    $scope.searchParent = function(son,tree){
        if(tree.nodes && tree.nodes.length >0){
            for(var i =0; i < tree.nodes.length; i++){
                if(tree.nodes[i] === son){
                    $scope.selectedParentItem = tree;
                }else{
                    $scope.searchParent(son, tree.nodes[i])
                }
            }
        }
    };

    $scope.disableProcedure = function(){
        $scope.findSelectedProcedure($scope.definition);
        // if disable 'if' -> disable 'if/else'
        if($scope.selectedPos.title === 'Control' && $scope.selectedPos.controlType === 'if'){
            for(var i = 0;i < $scope.definition.length; i++){
                $scope.searchParent($scope.selectedPos,$scope.definition[i]);
            }
            if($scope.selectedParentItem.controlType === 'if else'){
                $scope.selectedPos = $scope.selectedParentItem;
            }
        }

        $scope.selectedPos.disabled = true;
        $scope.disableSubItems($scope.selectedPos);
    };

    // disable items recursively
    $scope.disableSubItems = function(parent){
        if(parent.nodes){
            for(var i = 0; i < parent.nodes.length; i++){
                parent.nodes[i].disabled = true;
                $scope.disableSubItems(parent.nodes[i]);
            }
        }
    };

    $scope.enableProcedure = function(){
        $scope.findSelectedProcedure($scope.definition);
        $scope.enableSubItems($scope.selectedPos);
        $scope.enableParentItems($scope.selectedPos);
    };

    // enable sub items recursively
    $scope.enableSubItems = function(parent){
        if(parent && parent.nodes){
            for(var i = 0; i < parent.nodes.length; i++){
                parent.nodes[i].disabled = false;
                $scope.enableSubItems(parent.nodes[i]);
            }
        }
    };

    // cover backwards enable for if/else and for recursively
    $scope.enableParentItems = function(son){

        if(son && son.disabled === true){
            son.disabled = false;
            $scope.selectedParentItem = undefined;

            for(var i = 0;i < $scope.definition.length; i++){
                $scope.searchParent($scope.selectedPos,$scope.definition[i]);
            }
            $scope.selectedPos = $scope.selectedParentItem;
            $scope.enableParentItems($scope.selectedParentItem);
        }
    };

    $scope.numOfItems = 0;

    $scope.copyProcedure = function(){
        $scope.findSelectedProcedure($scope.definition);
        $scope.numOfItems = 0;
        $scope.findNumOfItems($scope.selectedPos);
        var temp =  angular.copy($scope.selectedPos);
        $scope.updateCopyItemId(temp,$scope.numOfItems);
        $scope.newItem(undefined,undefined,true,temp);
    };

    // find number of items to be copy
    $scope.findNumOfItems = function(parent){
        if(parent && parent.nodes){
            if(parent.controlType !== 'if' && parent.controlType !== 'else'){
                $scope.numOfItems ++;
            }
            for(var i = 0; i < parent.nodes.length; i++){
                $scope.findNumOfItems (parent.nodes[i]);
            }
        }
    };

    // update copy item id & reset selected attribute
    $scope.updateCopyItemId = function(parent,increment){
        if(parent && parent.nodes){
            parent.id += increment;
            parent.selected = false;
            for(var i = 0; i < parent.nodes.length; i++){
                $scope.updateCopyItemId (parent.nodes[i],increment);
            }
        }
    };

    $scope.isOutput = function(){
        if($scope.definition!== undefined){
            $scope.findSelectedProcedure($scope.definition);
            if($scope.selectedPos !== undefined){
                if( $scope.selectedPos.title === 'Output' ){
                    return true;
                }else{
                    return false;
                }
            }
        }
    };

    $scope.checkDisabled = function(){
        if($scope.definition !== undefined){
            $scope.findSelectedProcedure($scope.definition);
            if($scope.selectedPos !== undefined) {
                if ($scope.selectedPos.disabled === true || $scope.selectedPos.title === 'Output') {
                    return true;
                } else {
                    return false;
                }
            }
        }
    };

    $scope.generateCode =  function (){
        var selectedType;

        // fixme case where no type selected
        for(var i = 0; i< $scope.typeList.length; i++){
            if(  $scope.typeList[i].selected === true){
                selectedType = $scope.typeList[i];
            }
        }

        if(selectedType === undefined){
            return '';
        }
        //// function name
        //var jsCode ='// This is definition for function '
        //            + selectedType.nodeType + '\n'
        //            + 'function ' + selectedType.nodeType +' (';
        //
        //// function inputs
        //var num_input_ports = selectedType.inputConnectors.length;
        //
        //if(num_input_ports){
        //    for(var k = 0; k < num_input_ports; k++){
        //        jsCode += selectedType.inputConnectors[k].name;
        //    }
        //
        //    if(jsCode.slice(-1) === ','){
        //        jsCode =  jsCode.substring(0, jsCode.length - 1);
        //    }
        //}
        //jsCode +=  '){\n';
        //
        //
        //// parameters code
        //for(var j = 0; j < selectedType.interfaceDataModel.length;j++){
        //    // creating new parameters
        //    var codeBlock = "    " + "var "
        //        + selectedType.interfaceDataModel[j].name
        //        + " = ";
        //    if(selectedType.interfaceDataModel[j].option.name === 'color picker'){
        //        var color = "'" + selectedType.interfaceDataModel[j].color + "' ;\n" ;
        //        codeBlock += color.replace('#','0x').replace("'",'').replace("'",'')
        //    }else{
        //        codeBlock += selectedType.interfaceDataModel[j].dataValue + ";\n";
        //    }
        //
        //    jsCode += codeBlock;
        //}
        //
        //// code for invoking inner function
        //var identifier = '_' + selectedType.version;
        //if(selectedType.version === 0){
        //    identifier = '';
        //}
        //
        //jsCode += '    return ' + selectedType.nodeType + identifier + '(';
        //
        //for(var j = 0; j < selectedType.interfaceDataModel.length; j++){
        //    jsCode += selectedType.interfaceDataModel[j].name;
        //    if(j !=  selectedType.interfaceDataModel.length-1){
        //        jsCode += ', '
        //    }
        //}
        //
        //jsCode +=   ');' + '\n}\n\n';

        var jsCode = '// This is definition for type '
                + selectedType.nodeType + '\n'
                + '// version: ' + selectedType.version + '\n';


        // inner(type) function definition: linking with parameters
        var identifier = '_' + selectedType.version;
        if(selectedType.version === 0){
            identifier = '';
        }

        jsCode += 'function ' + selectedType.nodeType + identifier + '( ';

        if(selectedType.interfaceDataModel !== undefined){
            for (var j = 0; j < selectedType.interfaceDataModel.length; j++) {
                jsCode += selectedType.interfaceDataModel[j].name;
                if (j != selectedType.interfaceDataModel.length - 1) {
                    jsCode += ', '
                }
            }
        }


        jsCode += ' ){\n';
        jsCode += '    var FUNC_OUTPUT = ';
        jsCode += selectedType.nodeType + identifier + ';\n';

        // define return items according to output port
        var num_output_ports = selectedType.outputConnectors.length;

        // inner function content
        if(selectedType.procedureDataModel !== undefined) {
            for (var j = 0; j < selectedType.procedureDataModel.length; j++) {
                // output procedure
                if (selectedType.procedureDataModel[j].title === 'Output') {
                    procedure_output(selectedType.procedureDataModel[j], false);
                }

                // data procedure
                if (selectedType.procedureDataModel[j].title == "Data") {
                    procedure_data(selectedType.procedureDataModel[j], false);
                }

                // action procedure
                if (selectedType.procedureDataModel[j].title == 'Action') {
                    procedure_action(selectedType.procedureDataModel[j], false);
                }

                // control procedure
                if (selectedType.procedureDataModel[j].title == 'Control') {
                    procedure_control(selectedType.procedureDataModel[j], false);
                }
            }
        }

        // return value
        if(num_output_ports){
            jsCode += '\n    return {\n';

            for(var k = 0; k < num_output_ports; k++){
                jsCode +=
                    '        ' + selectedType.outputConnectors[k].name
                    + ':'
                    + selectedType.outputConnectors[k].name
                    + ',\n'
            }
            jsCode += '    };\n' + '}\n\n'
        }else{
            jsCode += '}\n\n';
        }



        // data procedure
        function procedure_data(procedure,fromLoop){

            if(procedure.disabled === true){
                return;
            }
            if(procedure.disabled === true){
                return;
            }
            if(fromLoop){
                var intentation = '    ';
            }else{
                var intentation = '';
            }

            var codeBlock = '';

            if(procedure.title == "Data"){
                if(procedure.type === 'assign'){
                    // assign value to variable instead of creating new variable
                    codeBlock = intentation + "    "
                        + procedure.dataName
                        + " = "
                        + procedure.dataValue + ";\n";

                    jsCode += codeBlock;
                }else{
                    // creating new variable
                    codeBlock = intentation + "    " + "var "
                        + procedure.dataName
                        + " = "
                        + procedure.dataValue + ";\n";

                    jsCode += codeBlock;
                }
            }
        }

        // output procedure
        function procedure_output(procedure,fromLoop){

            if(procedure.disabled === true){
                return;
            }

            if(fromLoop){
                var intentation = '    ';
            }else{
                var intentation = '';
            }

            var codeBlock = '';

            if(procedure.title == "Output"){
                codeBlock = intentation + "    " + "var "
                    + procedure.name
                    + " = "
                    + procedure.dataValue + ";\n";

                jsCode += codeBlock;
            }
        }

        // action procedure
        function procedure_action(procedure,fromLoop){
            if(procedure.disabled === true){
                return;
            }

            // todo this is only a dummy intentation
            if(fromLoop){
                var intentation = '    ';
            }else{
                var intentation = '';
            }

            var codeBlock = '';
            if(procedure.method !== 'print' &&
                procedure.method !== 'expression' &&
                procedure.return !== false){
                codeBlock += intentation  + '    '  + 'var ' + procedure.result + ' = ';
            }else{
                codeBlock += intentation  + '    ';
            }

            if(procedure.method !== 'expression'){

                codeBlock +=  'MOBIUS.' + procedure.category + '.' +procedure.method + '(';

                for(var j = 0; j< procedure.parameters.length; j++){
                    if(j != procedure.parameters.length - 1 ){
                        codeBlock +=  procedure.parameters[j].value + ', ';
                    }else{
                        codeBlock += procedure.parameters[j].value;
                    }
                }

                codeBlock += ');\n';
            }else if(procedure.method === 'expression'){
                if(procedure.expression !== undefined && procedure.expression !== ''){
                    codeBlock += procedure.expression + ';';
                }
            }


            jsCode += codeBlock;
        }

        // control procedure
        function procedure_control(procedure,fromLoop){
            if(procedure.disabled === true){
                return;
            }

            var intentation;
            if(fromLoop){
                intentation = '    ';
            }else{
                intentation = '';
            }

            if(procedure.controlType === 'for each'){
                jsCode +=  intentation + '    ' + 'for( var ' +
                    procedure.dataName + ' of '
                    + procedure.forList + '){\n';

                if(procedure.nodes.length > 0){
                    for(var m = 0; m < procedure.nodes.length; m++){
                        if(procedure.nodes[m].title == 'Action'){procedure_action(procedure.nodes[m],nodeIndex,true)}
                        if(procedure.nodes[m].title == 'Data'){procedure_data(procedure.nodes[m],nodeIndex,true)}
                        if(procedure.nodes[m].title == 'Control'){procedure_control(procedure.nodes[m],nodeIndex,true)}
                    }
                }

                jsCode += intentation + '    }\n';
            }

            else if (procedure.controlType === 'if else'){
                jsCode +=  intentation + '    ' + 'if( ' +
                    procedure.nodes[0].ifExpression + ' ){\n';


                if(procedure.nodes[0].nodes.length > 0){
                    for(var i = 0; i < procedure.nodes[0].nodes.length; i++){
                        if(procedure.nodes[0].nodes[i].title == 'Action'){procedure_action(procedure.nodes[0].nodes[i],nodeIndex,true)}
                        if(procedure.nodes[0].nodes[i].title == 'Data'){procedure_data(procedure.nodes[0].nodes[i],nodeIndex,true)}
                        if(procedure.nodes[0].nodes[i].title == 'Control'){procedure_control(procedure.nodes[0].nodes[i],nodeIndex,true)}
                    }
                }

                jsCode += intentation + '    }else{\n';

                if(procedure.nodes[1].nodes.length > 0){
                    for(var m = 0; m < procedure.nodes[1].nodes.length; m++){
                        if(procedure.nodes[1].nodes[m].title == 'Action'){procedure_action(procedure.nodes[1].nodes[m],nodeIndex,true)}
                        if(procedure.nodes[1].nodes[m].title == 'Data'){procedure_data(procedure.nodes[1].nodes[m],nodeIndex,true)}
                        if(procedure.nodes[1].nodes[m].title == 'Control'){procedure_control(procedure.nodes[1].nodes[m],nodeIndex,true)}
                    }
                }

                jsCode += intentation + '    }\n';
            }
        }


        return jsCode;
    }


}]);