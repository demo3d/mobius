/*
 *	Module, with verb.js
 */

//----- To be specified by module developer
var module_name = "NURBS";
var version = "0.1";


// -------
var MODULE_NAME = module_name + "_v" + version;
MOBIUS_MODULES[MODULE_NAME] = ( function (mod){

	/*
	 *
	 * General Functions,
	 * Input - according to requirements; Output - non-geometric primitives
	 *
	 */

	mod.TOPOLOGY_DEF = {"vertices":[], "edges":[], "faces":[]}

	//
	//
	// frame functions
	//
	//
	/** @namespace */
	mod.frm = {  'meta' : {
					 'longName' : "Frame",
					 'description' : "Functions dealing with creation of local frames for drawing geometry."
			   		}
			   };
	
	/**
	 * Creates a local coordinate system with a given origin and the X-Axis and Y-Axis pointing towards the specfied points 
	 * @param {array / vertex object} origin - Origin of the local coordinate system
	 * @param {array / vertex object} xPoint - Point on the X-Axis 
	 * @param {array / vertex object} yPoint - Point on the Y-Axis
	 * @returns {frame object }  - A Frame Object
	 * @memberof frm
	 */
	mod.frm.byXYPoints = function(origin, xPoint, yPoint){

		if(origin.getGeometry != undefined)
			origin = origin.getGeometry();
	    
	    // how to you make sure the two axes are perpendicular
		var xaxis = [xPoint[0]-origin[0], xPoint[1]-origin[1], xPoint[2]-origin[2]];
		var yaxis = [yPoint[0]-origin[0], yPoint[1]-origin[1], yPoint[2]-origin[2]];

		if( mod.mtx.dot(xaxis, yaxis) != 0)
			mod.msc.print("Axes are not perpendicular");

		return new mObj_frame(origin, xaxis, yaxis, undefined);

	};
	mod.frm.byXYPoints.prototype.description = "\
	 <br>Creates a local coordinate system with a given origin and the X-Axis and Y-Axis pointing towards the specfied points\
	 <br><br><b>Inputs</b> \
	 <ul> \
	 <li><b>origin</b> <i>{array / vertex object}</i> - Origin of the local coordinate system </li>\
	 <li><b>xPoint</b> <i>{array / vertex object}</i>  - Point on the X-Axis </li>\
	 <li><b>yPoint</b> <i>{array / vertex object}</i>  - Point on the Y-Axis </li>\
	 </ul>\
	 <b>Returns </b> <i>{frame object }</i>  - Mobius Object (a frame)\
	 <br><br><pre><small>Usage:</small> <br>byXYPoints(origin, xPoint, yPoint)\
	 <br><br><small>Example:</small> <br>byXYPoints([0, 0, 0], [ 20, 0, 0], [ 0, 20, 0 ] )</pre>"
	        
	/**
	 * Creates a local coordinate system with a given origin and the X-Axis and Z-Axis pointing towards the specfied points 
	 * @param {array / vertex object} origin - Origin of the local coordinate system
	 * @param {array / vertex object} xPoint - Point on the X-Axis
	 * @param {array / vertex object} zPoint - Point on the Z-Axis
	 * @returns {frame object }  - A Frame Object
	 * @memberof frm
	 */
	mod.frm.byXZPoints = function(origin, xPoint, zPoint){		

		if(origin.getGeometry != undefined)
			origin = origin.getGeometry();

		var xaxis = [xPoint[0]-origin[0], xPoint[1]-origin[1], xPoint[2]-origin[2]];
		var zaxis = [zPoint[0]-origin[0], zPoint[1]-origin[1], zPoint[2]-origin[2]];		

		if( mod.mtx.dot(xaxis, zaxis) != 0)
			mod.msc.print("Axes are not perpendicular");

		return new mObj_frame(origin, xaxis, undefined, zaxis);

	};
	mod.frm.byXZPoints.prototype.description = "\
	 <br>Creates a local coordinate system with a given origin and the X-Axis and Z-Axis pointing towards the specfied points\
	 <br><br><b>Inputs</b> \
	 <ul> \
	 <li><b>origin</b> <i>{array / vertex object}</i> - Origin of the local coordinate system </li>\
	 <li><b>xPoint</b> <i>{array / vertex object}</i>  - Point on the X-Axis </li>\
	 <li><b>zPoint</b> <i>{array / vertex object}</i>  - Point on the Z-Axis </li>\
	 </ul>\
	 <b>Returns </b> <i>{frame object }</i>  - Mobius Object (a frame)\
	 <br><br><pre><small>Usage:</small> <br>byXZPoints(origin, xPoint, zPoint)\
	 <br><br><small>Example:</small> <br>byXZPoints([0, 0, 0], [ 20, 0, 0], [ 0, 20, 0 ] )</pre>"

	/**
	 * Creates a local coordinate system with a given origin and the Y-Axis and Z-Axis pointing towards the specfied points 
	 * @param {array / vertex object} origin - Origin of the local coordinate system
	 * @param {array / vertex object} xPoint - Point on the Y-Axis
	 * @param {array / vertex object} zPoint - Point on the Z-Axis
	 * @returns {frame object }  - A Frame Object
	 * @memberof frm
	 */
	mod.frm.byYZPoints = function(origin, yPoint, zPoint){

		if(origin.getGeometry != undefined)
			origin = origin.getGeometry();

		var yaxis = [yPoint[0]-origin[0], yPoint[1]-origin[1], yPoint[2]-origin[2]];
		var zaxis = [zPoint[0]-origin[0], zPoint[1]-origin[1], zPoint[2]-origin[2]];		

		if( mod.mtx.dot(zaxis, yaxis) != 0)
			mod.msc.print("Axes are not perpendicular");

		return new mObj_frame(origin, undefined, yaxis, zaxis)
	
	};
	mod.frm.byYZPoints.prototype.description = "\
	 <br>Creates a local coordinate system with a given origin and the Y-Axis and Z-Axis pointing towards the specfied points\
	 <br><br><b>Inputs</b> \
	 <ul> \
	 <li><b>origin</b> <i>{array / vertex object}</i> - Origin of the local coordinate system </li>\
	 <li><b>yPoint</b> <i>{array / vertex object}</i>  - Point on the Y-Axis </li>\
	 <li><b>zPoint</b> <i>{array / vertex object}</i>  - Point on the Z-Axis </li>\
	 </ul>\
	 <b>Returns </b> <i>{frame object }</i>  - Mobius Object (a frame)\
	 <br><br><pre><small>Usage:</small> <br>byYZPoints(origin, yPoint, zPoint)\
	 <br><br><small>Example:</small> <br>byYZPoints([0, 0, 0], [ 20, 0, 0], [ 0, 20, 0 ] )</pre>"

	/**
	 * Creates a local coordinate system with a given origin and the X and Y axis Vectors. Units vectors are not neccessary. 
	 * @param {array / vertex object} origin - Origin of the local coordinate system
	 * @param {array} xAxis - X-Axis Vector in [x, y, z] format
	 * @param {array} yAxis - Y-Axis Vector in [x, y, z] format
	 * @returns {frame object }  - A Frame Object
	 * @memberof frm
	 */
	mod.frm.byXYAxes = function(origin, xAxis, yAxis){

		if(origin.getGeometry != undefined)
			origin = origin.getGeometry();

		if( mod.mtx.dot(xAxis, yAxis) != 0)
			mod.msc.print("Axes are not perpendicular");

		return new mObj_frame(origin, xAxis, yAxis, undefined);

	};
	mod.frm.byXYAxes.prototype.description = "\
	 <br>Creates a local coordinate system with a given origin and the X and Y axis vectors. Units vectors are not neccessary.\
	 <br><br><b>Inputs</b> \
	 <ul> \
	 <li><b>origin</b> <i>{array / vertex object}</i> - Origin of the local coordinate system </li>\
	 <li><b>xAxis</b> <i>{array}</i>  - X-Axis Vector in [x, y, z] format </li>\
	 <li><b>yAxis</b> <i>{array}</i>  - Y-Axis Vector in [x, y, z] format </li>\
	 </ul>\
	 <b>Returns </b> <i>{frame object }</i>  - Mobius Object (a frame)\
	 <br><br><pre><small>Usage:</small> <br>byXYAxes(origin, xPoint, yPoint)\
	 <br><br><small>Example:</small> <br>byXYAxes([0, 0, 0], [ 20, 0, 0], [ 0, 20, 0 ] )</pre>"

	/**
	 * Creates a local coordinate system with a given origin and the X and Y axis Vectors. Units vectors are not neccessary. 
	 * @param {array / vertex object} origin - Origin of the local coordinate system
	 * @param {array} xAxis - X-Axis Vector in [x, y, z] format
	 * @param {array} zAxis - Z-Axis Vector in [x, y, z] format
	 * @returns {frame object }  - A Frame Object
	 * @memberof frm
	 */
	mod.frm.byXZAxes = function(origin, xAxis, zAxis){

		if(origin.getGeometry != undefined)
			origin = origin.getGeometry();

		if( mod.mtx.dot(xAxis, zAxis) != 0)
			mod.msc.print("Axes are not perpendicular");

		return new mObj_frame(origin, xAxis, undefined, zAxis);

	};
	mod.frm.byXZAxes.prototype.description = "\
	 <br>Creates a local coordinate system with a given origin and the X and Z axis vectors. Units vectors are not neccessary.\
	 <br><br><b>Inputs</b> \
	 <ul> \
	 <li><b>origin</b> <i>{array / vertex object}</i> - Origin of the local coordinate system </li>\
	 <li><b>xAxis</b> <i>{array}</i>  - X-Axis Vector in [x, y, z] format </li>\
	 <li><b>zAxis</b> <i>{array}</i>  - Z-Axis Vector in [x, y, z] format </li>\
	 </ul>\
	 <b>Returns </b> <i>{frame object }</i>  - Mobius Object (a frame)\
	 <br><br><pre><small>Usage:</small> <br>byXZAxes(origin, xAxis, zAxis)\
	 <br><br><small>Example:</small> <br>byXZAxes([0, 0, 0], [ 20, 0, 0], [ 0, 20, 0 ] )</pre>"


	/**
	 * Creates a local coordinate system with a given origin and the Y and Z axis Vectors. Units vectors are not neccessary. 
	 * @param {array / vertex object} origin - Origin of the local coordinate system
	 * @param {array} yAxis - Y-Axis Vector in [x, y, z] format
	 * @param {array} zAxis - Z-Axis Vector in [x, y, z] format
	 * @returns {frame object }  - A Frame Object
	 * @memberof frm
	 */
	mod.frm.byYZAxes = function(origin, yAxis, zAxis){

		if(origin.getGeometry != undefined)
			origin = origin.getGeometry();

		if( mod.mtx.dot(zAxis, yAxis) != 0)
			mod.msc.print("Axes are not perpendicular");

		return new mObj_frame(origin, undefined, yAxis, zAxis);

	};
	mod.frm.byYZAxes.prototype.description = "\
	 <br>Creates a local coordinate system with a given origin and the Y and Z axis vectors. Units vectors are not neccessary.\
	 <br><br><b>Inputs</b> \
	 <ul> \
	 <li><b>origin</b> <i>{array / vertex object}</i> - Origin of the local coordinate system </li>\
	 <li><b>yAxis</b> <i>{array}</i>  - Y-Axis Vector in [x, y, z] format </li>\
	 <li><b>zAxis</b> <i>{array}</i>  - Z-Axis Vector in [x, y, z] format </li>\
	 </ul>\
	 <b>Returns </b> <i>{frame object }</i>  - Mobius Object (a frame)\
	 <br><br><pre><small>Usage:</small> <br>byYZAxes(origin, xAxis, zAxis)\
	 <br><br><small>Example:</small> <br>byYZAxes([0, 0, 0], [ 20, 0, 0], [ 0, 20, 0 ] )</pre>"

	//
	//
	// solid functions
	//
	//
	/** @namespace */
	mod.sld = {  'meta' : {
					 'longName' : "Solids",
					 'description' : "Functions dealing with creation of 3D solid geometry."
			   		}
			   };

	/**
	 * Creates a solid object by extruding a surface along x, y, z vectors of the given local coordinate system
	 * @param { frame object } frame - Local coordinate system 
	 * @param { surface object } surface - Surface to be extruded
	 * @param { float } xDistance - Amount of extrusion in the direction of the x-Axis of the frame
	 * @param { float } yDistance - Amount of extrusion in the direction of the y-Axis of the frame
	 * @param { float } zDistance - Amount of extrusion in the direction of the z-Axis of the frame
	 * @returns { solid object }  - Solid object 
	 * @memberof sld
	 */
	mod.sld.byExtrusion = function(surface, frame, xDistance, yDistance, zDistance){
		//checked
		var bottomSurface = surface;
		var topSurface = MOBIUS.trn.shift(bottomSurface, frame, xDistance, yDistance, zDistance, true);

		var solid = [ bottomSurface, topSurface ];
		// join boundary points of the two surfaces
		var edges_b = bottomSurface.getGeometry().boundaries(); 
		var edges_t = topSurface.getGeometry().boundaries(); 
		for(var e=0; e < edges_b.length; e++ ){
			var edge_b = edges_b[e];
			var edge_t  = edges_t[e];
			var extrusionVector = verb.core.Mat.sub([MOBIUS.obj.getCentre(edge_t)], [MOBIUS.obj.getCentre(edge_b)]); 
			var srf = new mObj_geom_Surface(  new verb.geom.ExtrudedSurface( edge_b, extrusionVector[0] ) );
			solid.push(srf);
		}

		return MOBIUS.sld.bySurfaces( solid );

	};
	mod.sld.byExtrusion.prototype.description = "\
	 <br>Creates a solid object by extruding a surface along x, y, z vectors of the given local coordinate system.\
	 <br><br><b>Inputs</b> \
	 <ul> \
	 <li><b>frame</b> <i>{frame object}</i> - Local coordinate system (Input GLOBAL for WCS) </li>\
	 <li><b>surface</b> <i>{surface object}</i>  - Surface to be extruded </li>\
	 <li><b>xDistance</b> <i>{array}</i>  - Amount of extrusion in the direction of the x-Axis of the frame </li>\
	 <li><b>yDistance</b> <i>{array}</i>  - Amount of extrusion in the direction of the Y-Axis of the frame </li>\
	 <li><b>zDistance</b> <i>{array}</i>  - Amount of extrusion in the direction of the Z-Axis of the frame</li>\
	 </ul>\
	 <b>Returns </b> <i>{frame object }</i>  - Mobius Object (a frame)\
	 <br><br><pre><small>Usage:</small> <br>byExtrusion(frame, surface, xDistance, yDistance, zDistance)\
	 <br><br><small>Example:</small> <br>byExtrusion(GLOBAL, some_surface, 0, 10, 0)</pre>"

	/**
	 * Creates a single solid object from a list of surfaces 
	 * @param { array } listOfSurfaces - List of surface objects which form the solid
	 * @returns { solid object }  - Solid object 
	 * @memberof sld
	 */
	mod.sld.bySurfaces = function (listOfSurfaces){
		//checked

		return new mObj_geom_Solid( listOfSurfaces );
	};
	mod.sld.bySurfaces.prototype.description = "\
	 <br>Creates a single solid object from a list of surfaces .\
	 <br><br><b>Inputs</b> \
	 <ul> \
	 <li><b>listOfSurfaces</b> <i>{array}</i> - Array of Mobius Surface Objects </li>\
	 </ul>\
	 <b>Returns </b> <i>{solid}</i>  - Mobius Solid Object\
	 <br><br><pre><small>Usage:</small> <br>bySurfaces(listOfSurfaces)\
	 <br><br><small>Example:</small> <br>byExtrusion( [ srf1, srf2, srf3 ] )</pre>"

	//
	//
	// surface functions
	//
	//
	/** @namespace */
	mod.srf = {  'meta' : {
					 'longName' : "Surfaces",
					 'description' : "Functions dealing with creation of 2D surface geometry."
			   		}
			   };


	/**
	 * Creates a Nurbs surface from user-specified data
	 * @param {frame object} - Local coordinate system for the object
	 * @param {int} degreeU - Degree of the surface in the u-Direction 
	 * @param {int} degreeV - Degree of the surface in the v-Direction 
	 * @param {array} knotsU - Knots in the u-Direction 
	 * @param {array} knotsV - Knots in the v-Direction 
	 * @param {array} controlPoints - Array of points / vertex objects through which the curve passes ( [[x1, y1, z1], [x2, y2, z2], [x3, y3, z3], [x4, y4, z4], ...] )
	 * @param {array} weights - Weights ( optional parameter; maybe 'undefined' )
	 * @returns { surface object }  - Surface object
	 * @memberof srf
	 */
	mod.srf.nurbsByData = function ( frame, degreeU, degreeV, knotsU, knotsV, controlPoints, weights ){
		
		var controlPoints = controlPoints.map( function(p){ 
								
								if(p.getGeometry != undefined) 
									return p.getGeometry(); 
								else 
									return p; } )

		var srf = new verb.geom.NurbsSurface.byKnotsControlPointsWeights( degreeU,degreeV,knotsU,knotsV,controlPoints, weights )

		srf.transform( frame.toLocal() );

		return new mObj_geom_Surface( srf ) ;
	};
	mod.srf.nurbsByData.prototype.description = "\
	 <br>Creates a Nurbs surface from user-specified data.\
	 <br><br><b>Inputs</b> \
	 <ul> \
	 <li><b>frame</b> <i>{frame object}</i> - Local coordinate system (Input GLOBAL for WCS) </li>\
	 <li><b>degreeU</b> <i>{surface object}</i>  - Degree of the surface in the u-Direction  </li>\
	 <li><b>degreeV</b> <i>{surface object}</i>  - Degree of the surface in the v-Direction  </li>\
	 <li><b>knotsU</b> <i>{array}</i>  - Knots in the u-Direction  </li>\
	 <li><b>knotsV</b> <i>{array}</i>  - Knots in the v-Direction  </li>\
	 <li><b>controlPOints</b> <i>{array}</i>  - Array of points / vertex objects through which the curve passes ( [[x1, y1, z1], [x2, y2, z2], [x3, y3, z3], [x4, y4, z4], ...] )</li>\
	 <li><b>weights</b> <i>{array}</i>  - Weights ( optional parameter; maybe 'undefined' )</li>\
	 </ul>\
	 <b>Returns </b> <i>{ surface }</i>  - Mobius Surface Object\
	 <br><br><pre><small>Usage:</small> <br>nurbsByData( frame, degreeU, degreeV, knotsU, knotsV, controlPoints, weights )\
	 <br><br><small>Example:</small> <br>nurbsByData(GLOBAL, 2, 2, 1, 1, [[1, 1, 1], [2, 1, 2], [3, 4, 5], [2, 4, 5], [3, 6, 4], [2, 4, 8] ], undefined )>"




	/**
	 * Creates a Nurbs surface using the corner-points
	 * @param {frame object} - Local coordinate system for the object
	 * @param {array} cornerpoints - Array of points / vertex objects ( [ [x1, y1, z1], [x2, y2, z2], [x3, y3, z3], [x4, y4, z4] ] )
	 * @returns { surface object }  - Surface object
	 * @memberof srf
	 */
	mod.srf.nurbsByCorners = function ( cornerpoints ){

		var point0 = cornerpoints[0];
		var point1 = cornerpoints[1];
		var point2 = cornerpoints[2];
		var point3 = cornerpoints[3];

		if( point0.getGeometry != undefined )
			point0 = point0.getGeometry();
		if( point1.getGeometry != undefined )
			point1 = point1.getGeometry();
		if( point2.getGeometry != undefined )
			point2 = point2.getGeometry();
		if( point3.getGeometry != undefined )
			point3 = point3.getGeometry();

		var srf = new verb.geom.NurbsSurface.byCorners ( point0, point1, point2, point3 );
		//srf.transform( frame.toLocal() );

		return new mObj_geom_Surface( srf ) ;
	};
	mod.srf.nurbsByCorners.prototype.description = "\
	 <br>Creates a Nurbs surface using the corner-points.\
	 <br><br><b>Inputs</b> \
	 <ul> \
	 <li><b>frame</b> <i>{frame object}</i> - Local coordinate system (Input GLOBAL for WCS) </li>\
	 <li><b>cornerpoints</b> <i>{array}</i>  - Array of points / vertex objects ( [ [x1, y1, z1], [x2, y2, z2], [x3, y3, z3], [x4, y4, z4] ] )  </li>\
	 </ul>\
	 <b>Returns </b> <i>{ surface }</i>  - Mobius Surface Object\
	 <br><br><pre><small>Usage:</small> <br>nurbsByCorners( cornerpoints )\
	 <br><br><small>Example:</small> <br>nurbsByCorners( [ [0, 0, 0], [100, 0, 0], [100, 100, 0], [0, 100, 0] ] )>"


	/**
	 * Creates a surface by extruding a curve along x, y, z vectors of the given local coordinate system
	 * @param { frame object } frame - Local coordinate system 
	 * @param { curve object } curve - Curve to be extruded
	 * @param { float } xDistance - Amount of extrusion in the direction of the x-Axis of the frame
	 * @param { float } yDistance - Amount of extrusion in the direction of the y-Axis of the frame
	 * @param { float } zDistance - Amount of extrusion in the direction of the z-Axis of the frame
	 * @returns { surface object }  - Surface object 
	 * @memberof sld
	 */
	mod.srf.nurbsByExtrusion  = function(frame, curve, xDistance, yDistance, zDistance){

		var profile = curve.getGeometry();
		var ex_profile = MOBIUS.trn.shift( frame, curve, xDistance, yDistance, zDistance, true).getGeometry();

		var srf = new verb.geom.NurbsSurface.byLoftingCurves( [profile, ex_profile], 1 );
		srf.transform( frame.toLocal() );

		return new mObj_geom_Surface( srf ) ;

	};
	mod.srf.nurbsByExtrusion.prototype.description = "\
	 <br>Creates a surface by extruding a curve along x, y, z vectors of the given local coordinate system.\
	 <br><br><b>Inputs</b> \
	 <ul> \
	 <li><b>frame</b> <i>{frame object}</i> - Local coordinate system (Input GLOBAL for WCS) </li>\
	 <li><b>curve</b> <i>{curve object}</i> - Curve to be extended </li>\
	 <li><b>xDistance</b> <i>{float}</i>  - Amount of extrusion in the direction of the x-Axis of the frame  </li>\
	 <li><b>yDistance</b> <i>{float}</i>  - Amount of extrusion in the direction of the y-Axis of the frame  </li>\
	 <li><b>zDistance</b> <i>{float}</i>  - Amount of extrusion in the direction of the z-Axis of the frame  </li>\
	 </ul>\
	 <b>Returns </b> <i>{surface}</i>  - Mobius Surface Object Object\
	 <br><br><pre><small>Usage:</small> <br>nurbsByExtrusion(frame, curve, xDistance, yDistance, zDistance)\
	 <br><br><small>Example:</small> <br>nurbsByExtrusion( GLOBAL, srf_crv , 12, 0, 2)>"

	/**
	 * Creates a surface by lofting an array of curves 
	 * @param {array} listOfCurves - Array of curve objects
	 * @param {int} degree - Degree of the Surface ( optional parameter; defaults to 3)
	 * @returns { surface object }  - Surface Object 
	 * @memberof srf
	 */
	mod.srf.nurbsByLoft = function( listOfCurves, degree ){

		var deg = degree || 3;
		var curves = []; 
		
		for(var c=0; c<listOfCurves.length; c++)
			curves.push(listOfCurves[c].getGeometry()); 

		var srf = new verb.geom.NurbsSurface.byLoftingCurves( curves, deg );
		//srf.transform( frame.toLocal() );

		return new mObj_geom_Surface( srf ) ;
		
	};
	mod.srf.nurbsByLoft.prototype.description = "\
	 <br>Creates a surface by lofting an array of curves.\
	 <br><br><b>Inputs</b> \
	 <ul> \
	 <li><b>listOfCurves</b> <i>{array}</i> -  Array of curve objects</li>\
	 <li><b>degree</b> <i>{integer}</i> - Degree of the Surface ( optional parameter; defaults to 3)</li>\
	 </ul>\
	 <b>Returns </b> <i>{surface}</i>  - Mobius Surface Object\
	 <br><br><pre><small>Usage:</small> <br>nurbsByLoft( listOfCurves, degree )\
	 <br><br><small>Example:</small> <br>nurbsByLoft( listOfCurves, degree )>"


	/**
	 * Creates a surface by revolving a curve around the z-Axis of the specified local coordinate system 
	 * @param { frame object } frame - Local coordinate system; Z-Axis of the frame determines the axis of revolution
	 * @param { curve object } sectionCurve - Curve Object which has to be revolved about the z-Axis
	 * @param { float } angle - Angle of revolution in Degrees 
	 * @returns { surface object }  - Surface Object 
	 * @memberof srf
	 */
	mod.srf.nurbsByRevolution = function(frame, sectionCurve, angle){

		angle = 0.0174533*angle

		var profile = sectionCurve.getGeometry().transform( frame.toGlobal() );

		var srf = new mObj_geom_Surface( new verb.geom.RevolvedSurface( profile, [0,0,0], [0,0,1], angle ) ) ;

		srf.setGeometry( srf.getGeometry().transform( frame.toLocal() ) );

		return srf;
			
	};
	mod.srf.nurbsByRevolution.prototype.description = "\
	 <br>Creates a surface by revolving a curve around the z-Axis of the specified local coordinate system.\
	 <br><br><b>Inputs</b> \
	 <ul> \
	 <li><b>frame</b> <i>{frame object}</i> -  Local coordinate system; Z-Axis of the frame determines the axis of revolution</li>\
	 <li><b>sectionCurve</b> <i>{curve object}</i> - Curve Object which has to be revolved about the z-Axis</li>\
	 <li><b>angle</b> <i>{ float }</i> - Angle of revolution in Degrees</li>\
	 </ul>\
	 <b>Returns </b> <i>{surface}</i>  - Mobius Surface Object\
	 <br><br><pre><small>Usage:</small> <br>nurbsByRevolution(frame, sectionCurve, angle)\
	 <br><br><small>Example:</small> <br>nurbsByRevolution(GLOBAL, crv1, MATH.PI / 3)>"


	/**
	 * Creates a surface by sweeping the section-curve along the rail-curve
	 * @param { curve object } sectionCurve - Curve Object which determines the profile of the sweep
	 * @param { curve object } railCurve - Curve Object which determines the path of the sweep
	 * @returns { surface object }  - Surface Object 
	 * @memberof srf
	 */
	mod.srf.nurbsBySweep = function( sectionCurve, railCurve ){
		
		var profile = sectionCurve;
		if(sectionCurve.getGeometry != undefined)
			profile = sectionCurve.getGeometry();
		var rail = railCurve;
		if(railCurve.getGeometry != undefined)
			rail = railCurve.getGeometry();
		
		return new mObj_geom_Surface( new verb.geom.SweptSurface ( profile, rail ) ) ;
		
	};
	mod.srf.nurbsBySweep.prototype.description = "\
	 <br>Creates a surface by sweeping the section-curve along the rail-curve.\
	 <br><br><b>Inputs</b> \
	 <ul> \
	 <li><b>sectionCurve</b> <i>{curve object}</i> -   Curve Object which determines the profile of the sweep\
	 <li><b>railCurve</b> <i>{curve object}</i> -  Curve Object which determines the profile of the sweep\
	 </ul>\
	 <b>Returns </b> <i>{surface}</i>  - Mobius Surface Object\
	 <br><br><pre><small>Usage:</small> <br>nurbsBySweep(sectionCurve, railCurve)\
	 <br><br><small>Example:</small> <br>nurbsBySweep(crv1, crv2)>"


	/**
	 * Creates a spherical surface at the origin of the frame given 
	 * @param { frame object } frame - Local Coordinate System; Orientation of the sphere is determined by the local axes of the frame
	 * @param { float } radius - Radius of the sphere
	 * @returns { surface object }  - Surface Object 
	 * @memberof srf
	 */
	mod.srf.nurbsSphere = function(frame, radius){
					
		var sphere = new verb.geom.SphericalSurface( [0,0,0], radius );
		sphere = sphere.transform( frame.toLocal() );

		return new mObj_geom_Surface( sphere );

	};
	mod.srf.nurbsSphere.prototype.description = "\
	 <br>Creates a spherical surface at the origin of the frame given.\
	 <br><br><b>Inputs</b> \
	 <ul> \
	 <li><b>frame</b> <i>{frame object}</i> -   Local Coordinate System; Orientation of the sphere is determined by the local axes of the frame\
	 <li><b>radius</b> <i>{float}</i> -  Radius of the sphere\
	 </ul>\
	 <b>Returns </b> <i>{surface}</i>  - Mobius Surface Object\
	 <br><br><pre><small>Usage:</small> <br>nurbsSphere(frame, radius)\
	 <br><br><small>Example:</small> <br>nurbsSphere(GLOBAL, 12)>"


	/**
	 * Creates a cylinderical or conical surface at the origin of the frame given 
	 * @param { frame object } frame  - Local Coordinate System; Orientation of the cone is determined by the local axes of the frame
	 * @param { float } height - Height of the cone
	 * @param { float } radius1 - Radius of the base of the cone 
	 * @param { float } radius2 - Radius of the top of the cone; Setting this value to 0 would result in a cone; Setting this to be equal to radius1 would result in a cylinder
	 * @returns {mobiusobject}  - NURBS Surface
	 * @memberof srf
	 */
	mod.srf.nurbsCone = function(frame, height, radius1, radius2){

		if(radius1 == 0)
			radius1 = 0.0001
		if(radius2 == 0)
			radius2 = 0.0001

		// frame
		frameOr = MOBIUS.frm.byXYAxes( [0,0,0], [1,0,0], [0,1,0] )

		var baseProfile = MOBIUS.crv.circle( frameOr, radius1 )
		var topProfile = MOBIUS.crv.circle(frameOr, radius2)

		topProfile = MOBIUS.trn.shift( topProfile, frameOr, 0, 0, height, true );

		var surface = MOBIUS.srf.nurbsByLoft( [ baseProfile, topProfile ], 1 ) 

		surface.setGeometry( surface.getGeometry().transform( frame.toLocal() ));

		return surface;

	};
	mod.srf.nurbsCone.prototype.description = "\
	 <br>Creates a cylinderical or conical surface at the origin of the frame given.\
	 <br><br><b>Inputs</b> \
	 <ul> \
	 <li><b>frame</b> <i>{frame object}</i> -  Local Coordinate System; Orientation of the cone is determined by the local axes of the frame\
	 <li><b>height</b> <i>{float}</i> -  Height of the cone\
	 <li><b>radius1</b> <i>{float}</i> -  Radius of the base of the cone \
	 <li><b>radius2</b> <i>{float}</i> -  Radius of the top of the cone; Setting this value to 0 would result in a cone; Setting this to be equal to radius1 would result in a cylinder\
	 </ul>\
	 <b>Returns </b> <i>{surface}</i>  - Mobius Surface Object\
	 <br><br><pre><small>Usage:</small> <br>nurbsCone(frame, height, radius1, radius2)\
	 <br><br><small>Example:</small> <br>nurbsCone(frame, 10, 12, 33)>"



/**
	 * Creates a circular pipe along a given path 
	 * @param { curve object } centreCurve  - Curve Object which determines the path of the pipe
	 * @param { float } radius - Radius of the pipe
	 * @returns {mobiusobject}  - NURBS Surface
	 * @memberof srf
	 */
	mod.srf.nurbsPipe = function(centreCurve, radius){

		centreCurve = centreCurve.getGeometry();

		var origin = centreCurve.point(0);
		var zaxis = centreCurve.tangent(0);

		zaxis = verb.core.Vec.normalized( zaxis );
		var xaxis;
		if( zaxis[2] != 0 )
			xaxis = [1,1, (-zaxis[0]-zaxis[1])/zaxis[2] ];  
		else if( zaxis[1] != 0 )
			xaxis = [ 1, (-zaxis[0]-zaxis[2])/zaxis[1], 1 ];
		else if( zaxis[0] != 0 )
			xaxis = [ (-zaxis[0]-zaxis[1])/zaxis[0], 1, 1 ];
		else
			console.log("invalid tangent in pipe function")


		var frame = new mObj_frame( origin, xaxis, undefined, zaxis );
		var sectionCurve = MOBIUS.crv.circle( frame, radius );

		// compute some random vector perpendicular to the z-vector
/*		var sectionCurves  = [];
		for( var i=0; i<5; i++){

			var origin = centreCurve.point(i/5);
			var zaxis = centreCurve.tangent(i/5);

			zaxis = verb.core.Vec.normalized( zaxis );
			var xaxis = [1,1, ((-zaxis[0]-zaxis[1])/zaxis[2])]; 

			var frame = new mObj_frame( origin, xaxis, undefined, zaxis );
			var sectionCurve = MOBIUS.crv.circle( frame, radius );

			sectionCurves.push( sectionCurve );
		}*/


		return MOBIUS.srf.nurbsBySweep( sectionCurve, centreCurve );

	};
	mod.srf.nurbsPipe.prototype.description = "\
	 <br>Creates a circular pipe along a given path.\
	 <br><br><b>Inputs</b> \
	 <ul> \
	 <li><b>centreCurve</b> <i>{curve object}</i> -  Curve Object which determines the path of the pipe\
	 <li><b>radius1</b> <i>{float}</i> -  Radius of the pipe \
	 </ul>\
	 <b>Returns </b> <i>{surface}</i>  - Mobius Surface Object\
	 <br><br><pre><small>Usage:</small> <br>nurbsPipe(centreCurve, radius)\
	 <br><br><small>Example:</small> <br>nurbsPipe( crv1 , 12 )>"


	/**
	 * Divides the surface into a grid, based number of divisions in the u and v directions and  
	 * returns the uv-Parameters for the corresponding grid points
	 * @param { surface object } surface  - Surface Object for which the uv-Parameters are required
	 * @param { int } uSegments  - Number of divisions required in the u-Direction
	 * @param { int } vSegments  - Number of divisions required in the v-Direction
	 * @returns {2D array}  - List of UV positions [ [ u1, v1 ], [ u2, v2 ], [ u3, v3 ] ...]; Length of list is equal to uSegments*vSegments
	 * @memberof srf	 
	 */
	mod.srf.uvGridByNumber = function(surface, uSegments, vSegments){
		
		var uvList = [];

		var uincr = 1/(uSegments); 
		var vincr = 1/(vSegments); 
		for(var u=0; u<= uSegments; u++){
			for(var v=0; v<= vSegments; v++){
				uvList.push([u*uincr, v*vincr]);
			}
		}

		uvList.push(uSegments); 
		uvList.push(vSegments);

		return uvList;

	};
	mod.srf.uvGridByNumber.prototype.description = "\
	 <br>Divides the surface into a grid, based number of divisions in the u and v directions and returns the uv-Parameters for the corresponding grid points.\
	 <br><br><b>Inputs</b> \
	 <ul> \
	 <li><b>surface</b> <i>{surface object}</i> -  Surface Object for which the uv-Parameters are required\
	 <li><b>uSegments</b> <i>{Integer}</i> -   Number of divisions required in the u-Direction\
	 <li><b>vSegments</b> <i>{Integer}</i> -   Number of divisions required in the v-Direction \
	 </ul>\
	 <b>Returns </b> <i>{array}</i>  - List of UV positions [ [ u1, v1 ], [ u2, v2 ], [ u3, v3 ] ...]; Length of list is equal to uSegments*vSegments\
	 <br><br><pre><small>Usage:</small> <br>uvGridByNumber(surface, uSegments, vSegments)\
	 <br><br><small>Example:</small> <br>uvGridByNumber(srf1, 20, 20)>"

/*	mod.srf.uvGridByDistance = function(surface, uDistance, vDistance){

	};*/

	/**
	 * Returns the actual points on the surface, given a corresponding list of uv-parameters or a single [u, v] point
	 * @param { surface object } surface  - Surface Object for which the uv-Parameters are required
	 * @param { 2D array / array } uvList  - List of UV positions [ [ u1, v1 ], [ u2, v2 ], [ u3, v3 ] ...] or single [u, v]
	 * @returns {array}  - List of vertex objects
	 * @memberof srf
	 */
	mod.srf.getPoints = function(surface, uvList){
		
		var srf = surface.getGeometry();		

		if(uvList.constructor.name == "Array"){

			var points = uvList.map( function(p){
				return new mobj_geom_Vertex( srf.point( p[0], p[1] ) );
			})
			
			return points;
		}
		else
			return new mobj_geom_Vertex( srf.point( u, v ) );

	};
	mod.srf.getPoints.prototype.description = "\
	 <br>Returns the actual points on the surface, given a corresponding list of uv-parameters or a single [u, v] point.\
	 <br><br><b>Inputs</b> \
	 <ul> \
	 <li><b>surface</b> <i>{surface object}</i> -   Surface Object for which the uv-Parameters are required\
	 <li><b>uvList</b> <i>{2D Array}</i> -    List of UV positions [ [ u1, v1 ], [ u2, v2 ], [ u3, v3 ] ...] or single [u, v]\
	 </ul>\
	 <b>Returns </b> <i>{array}</i>  - List of vertex objects\
	 <br><br><pre><small>Usage:</small> <br>getPoints(surface, uvList)\
	 <br><br><small>Example:</small> <br>getPoints(srf1, [[4, 2], [3, 5])>"


	/**
	 * Creates a collection of frames, centred at the the points specified by the uv-List, with the x and y Axes of the frame aligned along
	 * the surface 
	 * @param { surface object } surface  - Surface Object along which frames are required
	 * @param { 2D array } uvList  - List of UV positions [ [ u1, v1 ], [ u2, v2 ], [ u3, v3 ] ...] or single [u, v]
	 * @returns {array}  - List of Frame Objects
	 * @memberof srf
	 */
	mod.srf.getFrames = function( surface, uvList ){

		var frames = [];

		if(uvList.constructor.name != "Array")
			uvList = [uvList];

		for(var i=0; i<uvList.length; i++){
			var origin = surface.getGeometry().point( uvList[i][0], uvList[i][1] );
			var xaxis = verb.core.Vec.sub( origin, surface.getGeometry().point( uvList[i][0] + 0.1, uvList[i][1] ) );
			var yaxis = verb.core.Vec.sub( origin, surface.getGeometry().point( uvList[i][0] , uvList[i][1] + 0.1 ) )

			frames.push( new mObj_frame( origin, xaxis, yaxis, undefined ) );
		}

		if(frames.length == 1)
			frames = frames[0]

		return frames;

	};
	mod.srf.getFrames.prototype.description = "\
	 <br>Creates a collection of frames, centred at the the points specified by the uv-List, with the x and y Axes of the frame aligned along the surface.\
	 <br><br><b>Inputs</b> \
	 <ul> \
	 <li><b>surface</b> <i>{surface object}</i> -  Surface Object along which frames are required \
	 <li><b>uvList</b> <i>{2D Array}</i> -    List of UV positions [ [ u1, v1 ], [ u2, v2 ], [ u3, v3 ] ...] or single [u, v]\
	 </ul>\
	 <b>Returns </b> <i>{array}</i>  - List of frame objects\
	 <br><br><pre><small>Usage:</small> <br>getFrames(surface, uvList)\
	 <br><br><small>Example:</small> <br>getFrames(srf1, [[4, 2], [3, 5])>"

	/**
	 * Returns a list of unit vectors normal to the surface the points on specified by the uv-List
	 * @param { surface object } surface  - Surface Object 
	 * @param { 2D array } uvList  - List of UV positions [ [ u1, v1 ], [ u2, v2 ], [ u3, v3 ] ...] or single [u, v]
	 * @returns {array}  - List of Normal Unit Vectors 
	 * @memberof srf
	 */
	mod.srf.getNormals = function( surface, uvList ){

		if(uvList.constructor.name != "Array")
			uvList = [uvList];

		var normals = [];
		for(var i=0; i<uvList.length; i++)
			normals.push( verb.core.Vec.normalized( surface.normal(uvList[i][0], uvList[i][1])) );

		if(normals.length == 1)
			normals = normals[0]

		return normals;

	};
	mod.srf.getNormals.prototype.description = "\
	 <br>Returns a list of unit vectors normal to the surface the points on specified by the uv-List.\
	 <br><br><b>Inputs</b> \
	 <ul> \
	 <li><b>surface</b> <i>{surface object}</i> -  Surface Object \
	 <li><b>uvList</b> <i>{2D Array}</i> -    List of UV positions [ [ u1, v1 ], [ u2, v2 ], [ u3, v3 ] ...] or single [u, v]\
	 </ul>\
	 <b>Returns </b> <i>{array}</i>  - List of Normal Unit Vectors\
	 <br><br><pre><small>Usage:</small> <br>getNormals(surface, uvList)\
	 <br><br><small>Example:</small> <br>getNormals(srf1, [[4, 2], [3, 5])>"

	/**
	 * Returns a list of unit vectors tangent to the surface at the points specified by the uv-List
	 * @param { surface object } surface  - Surface Object 
	 * @param { 2D array } uvList  - List of UV positions [ [ u1, v1 ], [ u2, v2 ], [ u3, v3 ] ...] or single [u, v]
	 * @returns {2D array}  - List of Tangent Unit Vectors along two directions  (or single tangent unit vector)
	 * @memberof srf
	 */
	mod.srf.getTangents = function( surface, uvList ){

		if(uvList.constructor.name != "Array")
			uvList = [uvList];

		var tangents = [];
		for(var i=0; i<uvList.length; i++){
			var xaxis = verb.core.Vec.normalized( verb.core.Vec.sub( origin, surface.getGeometry().point( uvList[i][0] + 0.1, uvList[i][1] ) ));
			var yaxis = verb.core.Vec.normalized( verb.core.Vec.sub( origin, surface.getGeometry().point( uvList[i][0], uvList[i][1] + 0.1 ) ));
			tangents.push( [xaxis, yaxis])
		}

		if(tangents.length == 1)
			tangents = tangents[0]

		return tangents;
	}; 
	mod.srf.getTangents.prototype.description = "\
	 <br>Returns a list of unit vectors tangent to the surface at the points specified by the uv-List.\
	 <br><br><b>Inputs</b> \
	 <ul> \
	 <li><b>surface</b> <i>{surface object}</i> -  Surface Object \
	 <li><b>uvList</b> <i>{2D Array}</i> -    List of UV positions [ [ u1, v1 ], [ u2, v2 ], [ u3, v3 ] ...] or single [u, v]\
	 </ul>\
	 <b>Returns </b> <i>{array}</i>  - List of Tangent Unit Vectors\
	 <br><br><pre><small>Usage:</small> <br>getTangents(surface, uvList)\
	 <br><br><small>Example:</small> <br>getTangents(srf1, [[4, 2], [3, 5])>"

 
 	/**
	 * Returns a list or a single iso-curve object along u or v-Direction 
	 * @param { surface object } surface  - Surface Object 
	 * @param { array } uOrvList  - List of positions at which iso-curves are required or single u/v value
	 * @param { array } useV  - Specifies if the given list of positions is in u-Direction or v-Direction; True value means v-Direction;
	 * @returns {2D array}  - List of Tangent Unit Vectors along two directions 
	 * @memberof srf
	 */
	mod.srf.getIsoCurves = function( surface, uOrvList, useV ){

		if(surface.getGeometry != undefined)
			surface = surface.getGeometry();

		if(uvList.constructor.name != "Array")
			uvList = [uvList];

		var isoCurves = [];
		for(var t=0; t<uOrvList.length; t++){
			var crv = new mObj_geom_Curve( surface.isocurve( uOrvList[t], useV ) );
			isoCurves.push(crv);
		}

		if(isoCurves.length == 1)
			isoCurves = isoCurves[0]; 

		return isoCurves;
	};

	mod.srf.getIsoCurves.prototype.description = "\
	 <br>Returns a list or a single iso-curve object along u or v-Direction\
	 <br><br><b>Inputs</b> \
	 <ul> \
	 <li><b>surface</b> <i>{surface object}</i> -  Surface Object \
	 <li><b>uOrvList</b> <i>{Array}</i> -  List of positions at which iso-curves are required or single u/v value\
	 <li><b>userV</b> <i>{true / false}</i> - Specifies if the given list of positions is in u-Direction or v-Direction; True value means v-Direction;\
	 </ul>\
	 <b>Returns </b> <i>{array}</i>  - List of Iso curves  \
	 <br><br><pre><small>Usage:</small> <br>getIsoCurves( surface, uOrvList, useV )\
	 <br><br><small>Example:</small> <br>getIsoCurves( srf1, [] , false )>"

	/**
	 * Subdivides a surface into a grid of smaller surfaces - a mesh solid
	 * @param {surface object} surface - Surface Object 
	 * @param {int} uvGrid - UV positions with u & v dimensions [ [ u1, v1 ], ... [ un, vn ], uDimension, vDimension ]
	 * @returns {solid object} Solid object  
	 * @memberof srf
	 */
	mod.srf.divide = function(surface, uvGrid){
		
		var srf = surface.getGeometry(); 
		
		var div_surfaces = [];

		var vgrid = uvGrid.pop();
		var ugrid = uvGrid.pop();

		//uvGrid should be an ordered set of points - u direction first
		for(var uv=0; uv < uvGrid.length - vgrid - 2; uv++){
			
			if( (uv+1)%(vgrid+1) == 0 && uv!=0)
				continue;

			var point1 = srf.point( uvGrid[uv][0], uvGrid[uv][1] )
			var point2 = srf.point( uvGrid[uv+1][0], uvGrid[uv+1][1] )
			var point3 = srf.point( uvGrid[uv+vgrid+2][0], uvGrid[uv+vgrid+2][1] )
			var point4 = srf.point( uvGrid[uv+vgrid+1][0], uvGrid[uv+vgrid+1][1] )

			var sub_srf =  new mObj_geom_Surface( 
								new verb.geom.NurbsSurface.byCorners( point1, point2, point3, point4 ));
			div_surfaces.push(sub_srf); 
		}

		return new mObj_geom_Solid( div_surfaces );

	};
	mod.srf.divide.prototype.description = "\
	 <br>Subdivides a surface into a grid of smaller surfaces - a mesh solid\
	 <br><br><b>Inputs</b> \
	 <ul> \
	 <li><b>surface</b> <i>{surface object}</i> -  Surface Object \
	 <li><b>uvGrid</b> <i>{Array}</i> -  UV positions with u & v dimensions [ [ u1, v1 ], ... [ un, vn ], uDimension, vDimension ]\
	 </ul>\
	 <b>Returns </b> <i>{solid}</i>  - Mobius Solid Object  \
	 <br><br><pre><small>Usage:</small> <br>divide( surface, uvGrid)\
	 <br><br><small>Example:</small> <br>divide( srf1, [ [], [], [] ] )>"

/*	mod.srf.carve = function(surface, uv1, uv2, hole){

	};*/


	//
	//
	// Curves
	//
	//
	/** @namespace */
	mod.crv = {  'meta' : {
					 'longName' : "Curves",
					 'description' : "Functions dealing with creation of  1D lines and curves"
			   		}
			   };


	/**
	 * Creates a Nurbs curve from user-specified data
	 * @param {frame object} - Local Coordinate System 
	 * @param {int} degree - Degree of the curve
	 * @param {array} knots - Knots of the curve
	 * @param {array} controlPoints - Array of points / vertex objects through which the curve passes ( [[x1, y1, z1], [x2, y2, z2], [x3, y3, z3], [x4, y4, z4], ...] )
	 * @param {array} weights - Weights ( optional parameter; maybe 'undefined' )
	 * @returns { curve object }  - Curve object
	 * @memberof crv
	 */
	mod.crv.nurbsByData = function( frame, degree, knots, controlPoints, weights ){

		controlPoints = controlPoints.map( function(p){ 
								
								if(p.getGeometry != undefined) 
									return p.getGeometry(); 
								else 
									return p; } )

		var crv = new verb.geom.NurbsCurve.byKnotsControlPointsWeights( degree, knots, controlPoints, weights )
		crv = crv.transform( frame.toLocal() );

		return new mObj_geom_Curve( crv ) ;

	};


	/**
	 * Creates a Nurbs curve passsing through a list of points 
	 * @param {frame object} - Local Coordinate System 
	 * @param {array} points - Array of points / vertices through which the curve passes ( [[x1, y1, z1], [x2, y2, z2], [x3, y3, z3], [x4, y4, z4], ...] )
	 * @param {int} degree - Degree of the Curve
	 * @returns {curve object}  - NURBS Curve
	 * @memberof crv
	 */
	mod.crv.nurbsByPoints = function( frame, points, degree ){

		points = points.map( function(p){ 
								
								if(p.getGeometry != undefined) 
									return p.getGeometry(); 
								else 
									return p; } )

		var crv = new verb.geom.NurbsCurve.byPoints( points, degree )
		crv = crv.transform( frame.toLocal() );

		return new mObj_geom_Curve( crv ) ;
	};

	/**
	 * Creates a Bezier Nurbs curve passsing through a list of points 
	 * @param {frame object} - Local Coordinate System 
	 * @param {array} points - Array of points / vertices through which the curve passes ( [[x1, y1, z1], [x2, y2, z2], [x3, y3, z3], [x4, y4, z4], ...] )
	 * @param {int} degree - Degree of the Curve
	 * @returns {curve object}  - NURBS Curve
	 * @memberof crv
	 */
	mod.crv.bezierByPoints = function(frame, points, weights) {

		points = points.map( function(p){ 
								
								if(p.getGeometry != undefined) 
									return p.getGeometry(); 
								else 
									return p; } );

		var crv =  new verb.geom.BezierCurve( points, weights ) ;
		crv = crv.transform( frame.toLocal() );

		return new mObj_geom_Curve( crv );
	};


	/**
	 * Creates an arc centred at the origin of the frame; The arc is created in the xy-plane of the local coordinate system
	 * @param {frame object} frame - Local coordinate system
	 * @param {float} radius - Radius of the arc
	 * @param {float} minAngle - Starting angle in degrees
	 * @param {float} maxAngle - Ending angle in degrees
	 * @returns {curve object}  - NURBS Curve
	 * @memberof crv
	 */
	mod.crv.arc = function(frame, radius, minAngle, maxAngle){

		minAngle = 0.0174533*minAngle;
		maxAngle = 0.0174533*maxAngle;

		var arc = new verb.geom.Arc( [0,0,0], [1,0,0], [0,1,0], radius, minAngle, maxAngle) 
		arc = arc.transform( frame.toLocal() );
		
		return new mObj_geom_Curve( arc ) ;

	};

/*	mod.crv.arcByPointsSOE = function(startPoint, onArcPoint, endPoint){

	};

	mod.crv.arcByPointsCSE = function(centrePoint, startPoint, endPoint){

	};*/

	/**
	 * Creates an circle centred at the origin of the frame; The circle is created in the xy-plane of the local coordinate system
	 * @param {frame object} frame - Local coordinate system
	 * @param {float} radius - Radius of the arc
	 * @returns {curve object}  - NURBS Curve
	 * @memberof crv
	 */
	mod.crv.circle = function(frame, radius){

		var circle =  new verb.geom.Circle( [0,0,0], [1,0,0], [0,1,0], radius ) 
		circle = circle.transform( frame.toLocal() );

		return new mObj_geom_Curve( circle ) 
	};

	/**
	 * Creates an ellipse centred at the origin of the frame; The ellipse is created in the xy-plane of the local coordinate system
	 * @param {frame object} frame - Local coordinate system
	 * @param {float} xRadius - Radius of the ellipse
	 * @param {float} yRadius - Radius of the ellipse
	 * @returns {curve object}  - NURBS Curve
	 * @memberof crv
	 */
	mod.crv.ellipse = function(frame, xRadius, yRadius) {

		var ellipse = new verb.geom.Ellipse( [0,0,0], [1,0,0], [0,1,0], radius );
		ellipse = ellipse.transform( frame.toLocal() )

		return new mObj_geom_Curve( ellipse ); 
		
	};

	/**
	 * Creates an ellipse arc centred at the origin of the frame; The ellipse arc is created in the xy-plane of the local coordinate system
	 * @param {frame object} frame - Local coordinate system
	 * @param {float} xRadius - Radius of the ellipse arc
	 * @param {float} yRadius - Radius of the ellipse arc
	 * @param {float} minAngle - Starting angle in degrees
	 * @param {float} maxAngle - Ending angle in degrees
	 * @returns {curve object}  - NURBS Curve
	 * @memberof crv
	 */
	mod.crv.ellipseArc = function(frame, xRadius, yRadius, minAngle, maxAngle){

		minAngle = 0.0174533*minAngle;
		maxAngle = 0.0174533*maxAngle;

		var ellipseArc = new verb.geom.EllipseArc( [0,0,0], [1,0,0], [0,1,0], radius, minAngle, maxAngle );
		ellipseArc = ellipse.transform( frame.toLocal() );

		return new mObj_geom_Curve( ellipseArc ); 
	};


	/**
	 * Creates a line
	 * @param {frame object} frame - Local coordinate system
	 * @param {point / vertex} startPoint - Starting point
	 * @param {point / vertex} endPoint - Ending point
	 * @returns {curve object}  - NURBS Line Curve
	 * @memberof crv
	 */
	mod.crv.line = function(frame, startPoint, endPoint){

		if( startPoint.getGeometry != undefined )
			startPoint = startPoint.getGeometry();
		if( endPoint.getGeometry != undefined )
			endPoint = endPoint.getGeometry();

		var crv = new verb.geom.Line(startPoint, endPoint);
		crv = crv.transform( frame.toLocal() );
	
		return new mObj_geom_Curve( crv );

	};

	/**
	 * Divides a curve into multiple segments and gives the corresponding t-parameter on the curve
	 * @param {curve object} curve - Curve Object to be divided
	 * @param {int} numPoints - Number of divisions required
	 * @returns {array}  - List of t-parameters at the division points
	 * @memberof crv
	 */
	mod.crv.divideByNumber = function(curve, numPoints){

		var tList = [];
		var incr = 1/(numPoints-1)
		for(var t=0; t<numPoints; t++){
			tList.push((t*incr).toFixed(1));
		}

		return tList; 

	};

	/**
	 * Divides a curve into multiple segments and equal distances along the curve and returns the corresponding t-parameter on the curve
	 * @param {curve object} curve - Curve Object to be divided
	 * @param {float} distance - Distance of each segment - along the curve
	 * @returns {array}  - List of t-parameters at the division points
	 * @memberof crv
	 */
	mod.crv.divideByDistance = function(curve, distance){

		var curve = curve.getGeometry();

		var tList = [];
	 	for(var len=0; len <= curve.length; len=len+distance){
	 		tList.push(curve.paramAtLength( len ));
	 	}

	 	return tList;

	};

	/**
	 * Returns a list of points on the curve, corresponding the list of t-parameters specified
	 * @param {curve object} curve - Curve Object 
	 * @param {array} tList - Array of t-parameters 
	 * @returns {array}  - List of vertex objects on the curve 
	 * @memberof crv
	 */
	mod.crv.getPoints = function(curve, tList){
		
		var curve = curve.getGeometry();		

		if(tList.constructor.name == "Array"){

			var points = tList.map( function( t ){
				return new mObj_geom_Vertex( curve.point( t ) );
			})
			
			return points;
		}
		else
			return new mObj_geom_Vertex( curve.point( tList ) );
	
	};

	/**
	 * Returns a list of frames, centred at t-points on the curve, with the x-Axis along the tangent to the curve at that
	 * point and z-Axis along the upVector
	 * @param {curve object} curve - Curve Object 
	 * @param {array} tList - Array of t-parameter
	 * @param {array} upVector - Vector specifying the z-axis of the frames  
	 * @returns {array}  - List of frames
	 * @memberof crv
	 */
	mod.crv.getFrames = function(curve, tList, upVector){

		var curve = curve.getGeometry();

		if(tList.constructor.name != "Array")
			tList = [tList];


		var frames = tList.map( function(t){

			return new mObj_frame( curve.point(t), undefined, upVector);
		})

		if(frames.length == 1)
			frames = frames[0]

		return frames;

	};

	/**
	 * Returns a list of unit tangent vectors at points corresponding to a list of or a single t-value on a curve
	 * @param {curve object} curve - Curve Object 
	 * @param {array} tList - Array of t-parameter or single t-parameter
	 * @returns {array}  - List or single unit tangent vector 
	 * @memberof crv
	 */
	mod.crv.getTangents = function(curve, tList){
	
		var curve = curve.getGeometry();		

		if(tList.constructor.name == "Array"){

			var points = tList.map( function( t ){
				return verb.core.Vec.normalized( curve.tangent( t ) );
			})
			
			return points;
		}
		else
			return verb.core.Vec.normalized( curve.tangent( tList ) ) ;

	};

/*	mod.crv.carve = function(curve, t1, t2, hole){

	}; */

	/**
	 * Returns a list of curve objects obtained by dividing a single curve at points corresponding to a list of t-values
	 * @param {curve object} curve - Curve Object 
	 * @param {array} tList - Array of t-parameter
	 * @returns {array}  - List of curve objects
	 * @memberof crv
	 */
	mod.crv.divideByTList = function(curve, tList){

		var curve = curve.getGeometry();

		var tPoints = tList.map( function(t){
			return curve.point(t);
		})

		var result = [];
		var crv = curve;
		for(var t=0; t<tList.length; t++){

			var tPoint = curve.point(t);

			var crvs = crv.split( crv.param(tPoint) );
			
			result.push(crvs[0]);
			crv = crvs[1];
		}

		return result;

	};

	/**
	 * Converts a curve into a polyline passing through points corresponding to t-paramters on the curve
	 * @param {curve object} curve - Curve Object 
	 * @param {array} tList - Array of t-parameter
	 * @returns {curve object}  - Curve Object
	 * @memberof crv
	 */
	mod.crv.convertToPolyline = function(curve, tList){

		var curve = curve.getGeometry(); 

		var plinePoints = []
		for(var p=0; p<tList.length; p++){
			plinePoints.push(curve.point(tList[p]));
		}

		return MOBIUS.crv.nurbsByPoints( plinePoints, 1, undefined);

	};

	/**
	 * Returns the length of the curve
	 * @param {curve object} curve - Curve Object 
	 * @returns {float}  - Length of the curve
	 * @memberof crv
	 */
	mod.crv.length = function( curve ){
		return curve.getGeometry().length();
	};

	//
	//
	// Points
	//
	//
	/** @namespace */
	mod.pnt = {  'meta' : {
					 'longName' : "Points",
					 'description' : "Functions dealing with creation of point geometry."
			   		}
			   };


	/**
	 * Creates a vertex object with the given point geometry
	 * @param {frame object} frame - Local Coordinate System
	 * @param {float} x - x-position
	 * @param {float} y - y-position
	 * @param {float} z - z-position
	 * @return {vertex object} Vertex object
	 * @memberof pnt
	 */
	mod.pnt.byCoords = function(x, y, z){
		return new mObj_geom_Vertex([x, y, z]);
	}
	mod.pnt.byCoords.prototype.description = "\
	 <br>Creates a vertex object with the given point geometry\
	 <br><br><b>Inputs</b> \
	 <ul> \
	 <li><b>x</b> <i>{float}</i> - x-Position\
	 <li><b>y</b> <i>{float}</i> - y-Position\
	 <li><b>z</b> <i>{float}</i> - z-Position\
	 </ul>\
	 <b>Returns </b> <i>{vertex}</i>  - Mobius Vertex Object  \
	 <br><br><pre><small>Usage:</small> <br>byCoords( x, y, z)\
	 <br><br><small>Example:</small> <br>byCoords( 12, 23, 12 )>"

	/**
	 * Returns the mid-point between two points
	 * @param {point / vertex object} point1 - [x, y , z] or Vertex
	 * @param {point / vertex object} point2 - [x, y , z] or Vertex
	 * @returns {point} Mid Point of line between the two given points 
	 * @memberof pnt
	 */
	mod.pnt.midPoint = function(point1, point2){

		if( point1.getGeometry != undefined )
			point1 = point1.getGeometry();
		if( point2.getGeometry != undefined )
			point2 = point2.getGeometry();

		return [ (point1[0] + point2[0])/2, (point1[1] + point2[1])/2, (point1[2] + point2[2])/2 ];
	};	
	mod.pnt.midPoint.prototype.description = "\
	 <br>Returns the mid-point between two points\
	 <br><br><b>Inputs</b> \
	 <ul> \
	 <li><b>point1</b> <i>{ point / vertex object }</i> -  [x, y , z] or Vertex\
	 <li><b>point2</b> <i>{ point / vertex object }</i> -  [x, y , z] or Vertex\
	 </ul>\
	 <b>Returns </b> <i>{vertex}</i>  - Mobius Vertex Object  \
	 <br><br><pre><small>Usage:</small> <br>midPoint( point1, point2 )\
	 <br><br><small>Example:</small> <br>midPoint( [10, 10, 10], [23, 34, 22] )>"

	/**
	 * Returns the distance between two points or vertices
	 * @param {point / vertex object} point1 - [x, y , z] or Vertex
	 * @param {point / vertex object} point2 - [x, y , z] or Vertex
	 * @returns {float} Distance 
	 * @memberof pnt
	 */
	mod.pnt.distance = function(point1, point2){

		if( point1.getGeometry != undefined )
			point1 = point1.getGeometry();
		if( point2.getGeometry != undefined )
			point2 = point2.getGeometry();
				 
		var deltaX, deltaY, deltaZ;

		deltaX = point1[0] - point2[0];
		deltaY = point1[1] - point2[1];
		deltaZ = point1[2] - point2[2];

		var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);
		return distance;
	};
	mod.pnt.distance.prototype.description = "\
	 <br>Returns the distance between two points or vertices\
	 <br><br><b>Inputs</b> \
	 <ul> \
	 <li><b>point1</b> <i>{ point / vertex object }</i> -  [x, y , z] or Vertex\
	 <li><b>point2</b> <i>{ point / vertex object }</i> -  [x, y , z] or Vertex\
	 </ul>\
	 <b>Returns </b> <i>{float}</i>  - Distance \
	 <br><br><pre><small>Usage:</small> <br>distance( point1, point2 )\
	 <br><br><small>Example:</small> <br>distance( [10, 10, 10], [23, 34, 22] )>"

	//
	//
	//	Vector functions
	//
	//
	/** @namespace */
	mod.vec= {  'meta' : {
					 'longName' : "Vectors",
					 'description' : "Functions dealing with creation and manipulation of vectors."
			   		}
			   };


	/**
	 * Returns a vector with magnitude x, y, z along the x, y, z axes
	 * @param {float} x - Magnitude along x-direction
	 * @param {float} y - Magnitude along y-direction
	 * @param {float} z - Magnitude along z-direction
	 * @returns {array} Vector 
	 * @memberof vec
	 */
	mod.vec.byCoords = function(x, y, z){
		return [x, y, z];
	};
	mod.vec.byCoords.prototype.description = "\
	 <br>Returns a vector with magnitude x, y, z along the x, y, z axes\
	 <br><br><b>Inputs</b> \
	 <ul> \
	 <li><b>x</b> <i>{float}</i> - Magnitude along x-direction\
	 <li><b>y</b> <i>{float}</i> - Magnitude along y-direction\
	 <li><b>z</b> <i>{float}</i> - Magnitude along z-direction\
	 </ul>\
	 <b>Returns </b> <i>{array}</i>  - Vector  \
	 <br><br><pre><small>Usage:</small> <br>vec.byCoords( x, y, z)\
	 <br><br><small>Example:</small> <br>vec.byCoords( 12, 23, 12 )>"

	/**
	 * Computes angle between two vectors
	 * @param {array} vector1  - Vector 1 in [x, y, z] format
	 * @param {array} vector2  - Vector 2 in [x, y, z] format
	 * @returns {float} radians
	 * @memberof vec
	 */
	mod.vec.angle = function(vector1, vector2){
		var dotP = MOBIUS.mtx.dot( vector1,  vector2 );
		var cos_t = dotP / (MOBIUS.vec.length( vector1 ) * MOBIUS.vec.length( vector2 ) );
		return Math.cosh(cos_t);
	};	
	mod.vec.angle.prototype.description = "\
	 <br>Computes angle between two vectors\
	 <br><br><b>Inputs</b> \
	 <ul> \
	 <li><b>vector1</b> <i>{ array }</i> - Vector 1 in [x, y, z] format\
	 <li><b>vector2</b> <i>{ array }</i> - Vector 1 in [x, y, z] format\
	 </ul>\
	 <b>Returns </b> <i>{float}</i>  - Radians  \
	 <br><br><pre><small>Usage:</small> <br>angle( vector1, vector2 )\
	 <br><br><small>Example:</small> <br>angle( [10, 10, 10], [23, 34, 22] )>"

	/**
	 * Computes the summation of two vectors
	 * @param {array} vector1  - Vector 1 in [x, y, z] format
	 * @param {array} vector2  - Vector 2 in [x, y, z] format
	 * @returns {array} vector
	 * @memberof vec
	 */
	mod.vec.add = function( vector1, vector2){
		return verb.core.Vec.add( vector1, vector2 );
	};
	mod.vec.add.prototype.description = "\
	 <br>Computes the summation of two vectors\
	 <br><br><b>Inputs</b> \
	 <ul> \
	 <li><b>vector1</b> <i>{ array }</i> - Vector 1 in [x, y, z] format\
	 <li><b>vector2</b> <i>{ array }</i> - Vector 1 in [x, y, z] format\
	 </ul>\
	 <b>Returns </b> <i>{array}</i>  - Vector  \
	 <br><br><pre><small>Usage:</small> <br>add( vector1, vector2 )\
	 <br><br><small>Example:</small> <br>add( [10, 10, 10], [23, 34, 22] )>"

	/**
	 * Computes the subtraction of two vectors
	 * @param {array} vector1  - Vector 1 in [x, y, z] format
	 * @param {array} vector2  - Vector 2 in [x, y, z] format
	 * @returns {array} vector
	 * @memberof vec
	 */
	mod.vec.subtract = function( vector1, vector2 ){
		return verb.core.Vec.sub( vector1, vector2 )
	};
	mod.vec.subtract.prototype.description = "\
	 <br>Computes the subtraction of two vectors\
	 <br><br><b>Inputs</b> \
	 <ul> \
	 <li><b>vector1</b> <i>{ array }</i> - Vector 1 in [x, y, z] format\
	 <li><b>vector2</b> <i>{ array }</i> - Vector 1 in [x, y, z] format\
	 </ul>\
	 <b>Returns </b> <i>{array}</i>  - Vector  \
	 <br><br><pre><small>Usage:</small> <br>subtract( vector1, vector2 )\
	 <br><br><small>Example:</small> <br>subtract( [10, 10, 10], [23, 34, 22] )>"

	/**
	 * Computes length of the vector
	 * @param {array} vector  - Vector in [x, y, z] format
	 * @returns {float} length
	 * @memberof vec
	 */
	mod.vec.length = function(vector){
		return Math.sqrt( vector[0]*vector[0] + vector[1]*vector[1] + vector[2]*vector[2] );
	};
	mod.vec.length.prototype.description = "\
	 <br>Computes the length of the vector\
	 <br><br><b>Inputs</b> \
	 <ul> \
	 <li><b>vector</b> <i>{ array }</i> - Vector 1 in [x, y, z] format\
	 </ul>\
	 <b>Returns </b> <i>{float}</i>  - Length of the vector  \
	 <br><br><pre><small>Usage:</small> <br>length( vector )\
	 <br><br><small>Example:</small> <br>length( [10, 10, 10] )>"

	/**
	 * Resets the length of the given vector
	 * @param {array} vector  - Vector in [x, y, z] format 
	 * @param {float} length - New length of the vector
	 * @returns {array} Vector 
	 * @memberof vec
	 */
	mod.vec.resize = function(vector, length){

		var unitV = verb.core.Vec.normalized( vector );
		return [ length*unitV[0], length*unitV[1], length*unitV[2] ] ;
	};
	mod.vec.resize.prototype.description = "\
	 <br>Resets the length of the vector\
	 <br><br><b>Inputs</b> \
	 <ul> \
	 <li><b>vector</b> <i>{ array }</i> - Vector in [x, y, z] format\
	 <li><b>length</b> <i>{ float }</i> - New length of the vector\
	 </ul>\
	 <b>Returns </b> <i>{array}</i>  - Resized Vector  \
	 <br><br><pre><small>Usage:</small> <br>resize( vector )\
	 <br><br><small>Example:</small> <br>resize( [10, 10, 10] )>"

	/**
	 * Scales the given vector
	 * @param {array} vector  - Vector in [x, y, z] format 
	 * @param {float} factor - Scaling factor of the vector
	 * @returns {array} Vector 
	 * @memberof vec
	 */
	mod.vec.scale = function(vector, factor){

		return [ factor*vector[0], factor*vector[1], factor*vector[2] ] ;
	}
	mod.vec.scale.prototype.description = "\
	 <br>Scales the given vector\
	 <br><br><b>Inputs</b> \
	 <ul> \
	 <li><b>vector</b> <i>{ array }</i> - Vector in [x, y, z] format\
	 <li><b>length</b> <i>{ float }</i> - Scaling factor of the vector\
	 </ul>\
	 <b>Returns </b> <i>{array}</i>  - Scaled Vector  \
	 <br><br><pre><small>Usage:</small> <br>scale( vector )\
	 <br><br><small>Example:</small> <br>scale( [10, 10, 10] )>"

	/**
	 * Computes unit vector
	 * @param {array} vector  - Vector in [x, y, z] format
	 * @returns {array} Unit Vector
	 * @memberof vec
	 */
	mod.vec.normalize = function(vector){
		return verb.core.Vec.normalized( vector );
	}
	mod.vec.normalize.prototype.description = "\
	 <br>Returns the unit vector\
	 <br><br><b>Inputs</b> \
	 <ul> \
	 <li><b>vector</b> <i>{ array }</i> - Vector in [x, y, z] format\
	 </ul>\
	 <b>Returns </b> <i>{array}</i>  - Unit Vector  \
	 <br><br><pre><small>Usage:</small> <br>normalize( vector )\
	 <br><br><small>Example:</small> <br>normalize( [10, 10, 10] )>"

	//
	//
	//	Objects
	//
	//
	/** @namespace */
	mod.obj = {  'meta' : {
					 'longName' : "Objects",
					 'description' : "Functions dealing with Mobius object operations."
			   		}
			   };


	/**
	 * Creates a copy of the object with the same geometry, transformations, material and data at the same location
	 * @param {any object} mObj - Object to be cloned
	 * @returns {object} Cloned object
	 * @memberof obj
	 */
	mod.obj.copy = function( object ){

		if( object.getGeometry == undefined ){
			console.log("Non-Mobius passed to copy function");
			return object;
		}

		// fix: make this into one line code with 'eval'
		var newcopy;
		if(object instanceof mObj_geom_Vertex)
			newcopy = new mObj_geom_Vertex( object.getGeometry() );
		else if(object instanceof mObj_geom_Curve)
			newcopy = new mObj_geom_Curve( object.getGeometry() );
		else if(object instanceof mObj_geom_Surface)
			newcopy = new mObj_geom_Surface( object.getGeometry() );
		else if(object instanceof mObj_geom_Solid)
			newcopy = new mObj_geom_Solid( object.getGeometry() );

		newcopy.setData( object.getData() );
		newcopy.setMaterial( object.getMaterial() );	

		return newcopy;
		
	};

	/**
	 * Adds material to an object
	 * @param {object} obj - Object to which material is to be added
	 * @param {String} material_type - "MeshBasicMaterial", "MeshNormalMaterial", "MeshLambertMaterial", "LineBasicMaterial" etc... 
	 * @param {boolean} wireframe - 'True' if wireframe is required. 
	 * @param {hexCode} color - Hex Code of the color
	 * @param {boolean} transparent - 'True' if transparency is required. 
	 * @returns null
	 * @memberof obj
	 */
	mod.obj.addMaterial = function(obj, material_type, wireframe, color_hex, transparent){
		
		var option = {	
			wireframe: wireframe,
			color: color_hex,
			transparent: transparent,
			side: THREE.DoubleSide
		};
		var material = new THREE[material_type](option);
		
		obj.setMaterial(material);

		//return obj;
	};

	mod.obj.addMaterial.prototype.return  = false;

	/**
	 * Adds data to an object
	 * @param {object} obj - Object to which data is to be added
	 * @param {String} dataName - Name of the property
	 * @param {String / int / object ... } dataValue - Value of the property
	 * @returns null
	 * @memberof obj
	 */
	mod.obj.addData = function(obj, dataName, dataValue){

		// decide on topology heirarchy also - if edge gets a property, do the vertices also get the same property?
		if(obj.constructor === Array){
			for(var i=0; i<obj.length; i++){
				if(obj[i].getData() == undefined)
					var new_data = {};
					new_data[dataName] = dataValue;
					obj[i].setData( new_data );
			}
		} else{
			if(obj.getData() == undefined)
				var new_data = {};
				new_data[dataName] = dataValue;
				obj.setData( new_data );
		}
	};

	mod.obj.addData.prototype.return = false;

	/**
	 * Returns the centre of a NURBS Curve, NURBS Surface or Solid Geometry
	 * @param {object} object - Mobius object
	 * @returns {array} Point - [x, y, z]
	 * @memberof obj
	 */
	mod.obj.getCentre = function(object){
		//calculate centre based on what kind of object
		var geometry = object;
		if(object.getGeometry != undefined)
			geometry = object.getGeometry();  

		// object is a solid
		if(geometry.constructor == Array ){

			var centres  = []
			for( var obj = 0; obj < geometry.length; obj++ )
				centres.push( MOBIUS.obj.getCentre( geometry[obj]) );

			var x = [];
			var y = [];
			var z = [];
			for( var i=0; i<centres.length; i++){
				x.push( centres[i][0] );
				y.push( centres[i][1] );
				z.push( centres[i][2] );
			}

			x = MOBIUS.lst.average( x );
			y = MOBIUS.lst.average( y );
			z = MOBIUS.lst.average( z );

			return [x, y, z]
		}

		if(geometry.center != undefined)
			return geometry.center();
		else if(geometry instanceof verb.geom.NurbsCurve)
			return geometry.point(0.5);
		else if(geometry instanceof verb.geom.NurbsSurface)
			return geometry.point(0.5, 0.5);
		else
			return "Invalid Input"
	};


	//
	//
	//	Transformation functions
	//
	//
	/** @namespace */
	mod.trn = {  'meta' : {
					 'longName' : "Transformations",
					 'description' : "Functions dealing with geometric transformations."
			   		}
			   };

	/**
	 * Reflects the object about the XY plane of the frame
	 * @param {object} object - Object to be reflected
	 * @param {frame object} frame - Local coordinate system
	 * @param {boolean} copy - Determines if the object is to be copied before transformation
	 * @returns {object} - Transformed Object or Copy 
	 * @memberof trn
	 */
	mod.trn.reflect = function(object, frame, copy){

		if (object instanceof mObj_geom_Solid)
			object = object.getGeometry();

		if (object instanceof Array){

			var newobject = [];
			
			for(var obj=0; obj < object.length; obj++)
				newobject.push(MOBIUS.trn.reflect( object[obj], frame, copy ));	
			
			return newobject;
		}

		if( copy )
			object = MOBIUS.obj.copy( object );

		var geom = object.getGeometry();

		var trnMat = [ [ 1, 0, 0, 0],
						[ 0, 1, 0, 0],
							[ 0, 0, -1, 0],
								[0, 0, 0, 1]
					];
						

		geom = geom.transform( frame.toGlobal() );
		geom = geom.transform( trnMat ); 
		geom = geom.transform( frame.toLocal() );
		
		object.setGeometry( geom ); 

		return object;
	
	};


	/**
	 * Rotates the object about the axes of the frame. 
	 * @param {object} object - Object to be rotated
	 * @param {frame object} frame - Local coordinate system
	 * @param {float} angleX - Angle to be rotated about x-Axis of the frame, in degrees
	 * @param {float} angleY - Angle to be rotated about y-Axis of the frame, in degrees
	 * @param {float} angleZ - Angle to be rotated about z-Axis of the frame, in degrees
	 * @param {boolean} copy - Determines if the object is to be copied before transformation
	 * @returns {object} - Transformed Object or Copy 
	 * @memberof trn
	 */
	mod.trn.rotate = function(object, frame, angleX, angleY, angleZ, copy){

		if (object instanceof mObj_geom_Solid)
			object = object.getGeometry();

		if (object instanceof Array){

			var newobject = [];
			
			for(var obj=0; obj < object.length; obj++)
				newobject.push(MOBIUS.trn.rotate( object[obj], frame, angleX, angleY, angleZ, copy ));	
			
			return newobject;
		}

		if( copy )
			object = MOBIUS.obj.copy( object );

		var geom = object.getGeometry();

		function getRotationMatrix( axis, angle){
				angle = 0.0174533*angle;
		        var cost = Math.cos(angle);
		        var sint = Math.sin(angle);
		        var ux = axis[0];
		        var uy = axis[1];
		        var uz = axis[2];

		        return [ [ cost + ux*ux*(1-cost), ux*uy*(1-cost) - uz*sint, ux*uz*(1-cost) + uy*sint, 0 ],
		                    [ ux*uy*(1-cost) + uz*sint,  cost + uy*uy*(1-cost),  uy*uz*(1-cost) - ux*sint, 0 ],
		                        [ ux*uz*(1-cost) - uy*sint, uy*uz*(1-cost) + ux*sint, cost + uz*uz*(1-cost), 0 ],
		                            [ 0, 0, 0, 1 ]
		                ];
		}
		

		geom = geom.transform( frame.toGlobal() );

		geom = geom.transform( getRotationMatrix([0,0,1], angleZ) );
		geom = geom.transform( getRotationMatrix([0,1,0], angleY) );
		geom = geom.transform( getRotationMatrix([1,0,0], angleX) );
				
		geom = geom.transform( frame.toLocal() );
		
		object.setGeometry( geom ); 

		return object;
	
	};


	/**
	 * Scales the object along different axes
	 * @param {object} object - Object to be scaled
	 * @param {frame object} frame - Local coordinate system
	 * @param {float} scaleX - Scaling factor along x-Axis of the frame
	 * @param {float} scaleY - Scaling factor along y-Axis of the frame
	 * @param {float} scaleZ - Scaling factor along z-Axis of the frame
	 * @param {boolean} copy - Determines if the object is to be copied before transformation
	 * @returns {object} - Transformed Object or Copy 
	 * @memberof trn
	 */
	mod.trn.scale = function(object, frame, scaleX, scaleY, scaleZ, copy) {

		if (object instanceof mObj_geom_Solid)
			object = object.getGeometry();

		if (object instanceof Array){

			var newobject = [];
			
			for(var obj=0; obj < object.length; obj++)
				newobject.push(MOBIUS.trn.scale(object[obj], frame, scaleX, scaleY, scaleZ, copy));	
			
			return newobject;
		}

		if( copy )
			object = MOBIUS.obj.copy( object );

		var geom = object.getGeometry();
			
		var trnMat = [ [ scaleX, 0, 0, 0 ],
						[ 0, scaleY, 0, 0],
							[ 0, 0, scaleZ, 0 ],
								[ 0, 0, 0, 1 ]
					];
			
		geom = geom.transform( frame.toGlobal() );
		geom = geom.transform( trnMat );
		geom = geom.transform( frame.toLocal() );
	
		object.setGeometry( geom ); 

		return object;


	};

	/**
	 * Shifts the object relative to its current position
	 * @param {object} object - Object to be shifted
	 * @param {frame object} frame - Local coordinate system
	 * @param {float} shiftX - Distance to be moved along x-Axis of the frame
	 * @param {float} shiftY - Distance to be moved along y-Axis of the frame
	 * @param {float} shiftZ - Distance to be moved along z-Axis of the frame
	 * @param {boolean} copy - Determines if the object is to be copied before transformation
	 * @returns {object} - Transformed Object or Copy 
	 * @memberof trn
	 */
	mod.trn.shift = function(object, frame, shiftX, shiftY, shiftZ, copy){

		if (object instanceof mObj_geom_Solid)
			object = object.getGeometry();

		if (object instanceof Array){

			var newobject = [];
			
			for(var obj=0; obj < object.length; obj++)
				newobject.push(MOBIUS.trn.shift( object[obj], frame, shiftX, shiftY, shiftZ, copy ));	
			
			return newobject;
		}
		
		if( copy )
			object = MOBIUS.obj.copy( object );

		var geom = object.getGeometry();

		var trnMat = [ [ 1, 0, 0, shiftX ], 
							[ 0, 1, 0, shiftY ], 
								[ 0, 0, 1, shiftZ ], 
									[ 0, 0, 0, 1 ]
					 	] 
	
		geom = geom.transform( frame.toGlobal() );
		geom = geom.transform( trnMat );
		geom = geom.transform( frame.toLocal() );
		
		object.setGeometry( geom ); 

		return object;
		
	};


	/**
	 * Moves the centre of the object to a target point
	 * @param {object} object - Object to be shifted
	 * @param {point / vertex } point - Point to which the object is to be moved
	 * @param {boolean} copy - Determines if the object is to be copied before transformation
	 * @returns {object} - Transformed Object or Copy 
	 * @memberof trn
	 */
	mod.trn.move = function(object, point, copy){

		if (object instanceof mObj_geom_Solid)
			object = object.getGeometry();
	
		var orCenter = MOBIUS.obj.getCentre(object);
			
		// frame definition
		var frame = MOBIUS.frm.byXYAxes([0,0,0], [1,0,0], [0,1,0])

		if( point.getGeometry != undefined )
			point = point.getGeometry()

		// translation required
		var tx = point[0] - orCenter[0];
		var ty = point[1] - orCenter[1];
		var tz = point[2] - orCenter[2]; 
		
		return MOBIUS.trn.shift( object, frame, tx, ty, tz, copy );		
	};


	//
	//
	// Matrix operations
	//
	//
	/** @namespace */
	mod.mtx = {  'meta' : {
					 'longName' : "Matrix",
					 'description' : "Functions dealing with matrix operations."
			   		}
			   };

	/**
	 * Computes dot product of two matrices
	 * @param {array} matrix1  - Matrix 1
	 * @param {array} matrix2  - Matrix 2
	 * @returns {float} 
	 * @memberof mtx
	 */
	mod.mtx.dot = function( matrix1, matrix2 ){
		return verb.core.Vec.dot(matrix1, matrix2);
	};

	/**
	 * Computes cross product of two matrices
	 * @param {array} matrix1  - Matrix 1
	 * @param {array} matrix2  - Matrix 2
	 * @returns {array} 
	 * @memberof mtx
	 */
	mod.mtx.cross = function( matrix1, matrix2 ){
		return verb.core.Vec.cross(matrix1, matrix2);
	};

	//
	//
	// Lists
	//
	//
	/** @namespace */
	mod.lst = {  'meta' : {
					 'longName' : "Lists",
					 'description' : "Functions dealing with lists."
			   		}
			   };


	/**
	 * Returns the length of the list 
	 * @param {array} list - List which is to be analyzed
	 * @returns {int} 
	 * @memberof lst
	 */
	mod.lst.length = function(list){
		return list.length
	};

	/**
	 * Finds the index of the first occurence of an array element. 
	 * @param {array} list  - List in which an element needs to be searched
	 * @param {array element} object - Element to be searched for
	 * @returns {int} Returns -1 if the element doesn't exist in array; else returns the index of the item
	 * @memberof lst
	 */
	mod.lst.find = function(list, item){
		return list.indexOf( item );
	};

	/**
	 * Appends the item as it is to a list
	 * @param {array} list  - List in which item is to be added
	 * @param {array / element} itemOrList - List or single element to be added to the list
	 * @returns {NULL} 
	 * @memberof lst
	 */
	mod.lst.append = function(list, itemOrList){
		list.push(itemOrList);
	};

	mod.lst.append.prototype.return = false;

	/**
	 * Inserts an item at a given index in a list
	 * @param {array} list  - List in which an element needs to be inserted
	 * @param {object} item - Element to be inserted
	 * @returns {NULL}
	 * @memberof lst
	 */
	mod.lst.insert = function(list, item, index){

		var newlist = [];
		for(var i=0; i<=list.length; i++){
			
			if(i < index)
				newlist.push(list[i]);
			else if(i == index)
				newlist.push(item);
			else
				newlist.push(list[i-1]);
		}
			
	};


	mod.lst.insert.prototype.return = false;

	/**
	 * Adds the elements of one list to another list
	 * @param {array} list  - List in which an elements need to be added
	 * @param {array} extension_list - List of elements to be added
	 * @returns {NULL}
	 * @memberof lst
	 */
	mod.lst.extend = function(list, extension_list){

		console.log("ex", extension_list)
		if(extension_list instanceof Array){
			// do nothing
		}
		else
			extension_list = [extension_list];
		
		extension_list.map( function(t){
			list.push(t);
		});

	};

	mod.lst.extend.prototype.return = false;

	/**
	 * Removes an array element from a list by its index number
	 * @param {array} list  - List in which an element needs to be removed
	 * @param {int} index - Index to be removed
	 * @returns {null} 
	 * @memberof lst
	 */
	mod.lst.remove = function(list, index) {
		list.splice(index, 1);
	};

	mod.lst.remove.prototype.return = false;


	/**
	 * Returns a number sequence in the form of an array
	 * @param {float or int} start  - Starting value of the sequence
	 * @param {float or int} end  - Ending value of the sequence (not included in the sequence)
	 * @param {float or int} stepSize  - Increment or Decrement value to get to the 'end' value from the 'start' value
	 * @returns {array} 
	 * @memberof lst
	 */
	mod.lst.sequence = function(start, end, stepSize){

		var arr = [];
		if( start == end ){
			arr.push(start);
		}
		else if(start > end && stepSize < 0){
			for(var i = start; i > end; i = i + stepSize)
				arr.push(i);
		} 
		else{
			for(var i = start; i < end; i = i + stepSize)
				arr.push(i);
		}

		return arr;
	};

	//
	//
	// Numeric lists
	//
	//

	/**
	 * Gets the average of a numeric array
	 * @param {array} numericList - List which is to be averaged
	 * @returns {float / int} Average of the numbers in the list
	 * @memberof lst
	 */
	mod.lst.average = function(numericList){
		return MOBIUS.lst.sum( numericList )/ numericList.length;
	};


	/**
	 * Gets the minimum value in a numeric list
	 * @param {array} numericList - List from which minimum value is required
	 * @returns {float / int} Minimum value
	 * @memberof lst
	 */
	mod.lst.min = function(numericList){
		
		var minValue = numericList[0];
		
		for(var i=0; i<numericList.length; i++)
			minValue = Math.min(minValue, numericList[i]);
		
		return minValue;
	
	};

	/**
	 * Gets the maximum value in a numeric array
	 * @param {array} numericList - List from which maximum value is required
	 * @returns {float / int} Maximum value
	 * @memberof lst
	 */
	mod.lst.max = function(numericList){
		
		var maxValue = numericList[0];
		
		for(var i=0; i<numericList.length; i++)
			maxValue = Math.max(maxValue, numericList[i]);
		
		return maxValue;
	
	};


	/**
	 * Gets the sum of a numeric array
	 * @param {array} numericList - List which is to be summed
	 * @returns {float / int} Sum of the numbers in the list
	 * @memberof lst
	 */
	mod.lst.sum = function( numericList ){
		
		var sum = 0;
		
		for(var i=0; i<numericList.length; i++)
			sum += numericList[i];
		
		return sum;
	
	};

	/**
	 * Returns the span of the list - the difference between the maximum and the minimum value in the list
	 * @param {array} numericList - List which is to be analyzed
	 * @returns {float / int} Span
	 * @memberof lst
	 */
	mod.lst.range = function( numericList ){
		
		return MOBIUS.lst.max( numericList ) - MOBIUS.lst.min( numericList );
	
	};


	//
	//
	// Misc functions
	//
	//
	/** @namespace */
	mod.msc = {  'meta' : {
					 'longName' : "Miscellaneous",
					 'description' : "Miscellaneous functions"
			   		}
			   };

	/**
	 * Converts degrees into radians
	 * @param {float} degree - Degrees to be converted
	 * @returns {float} Value in Radians
	 * @memberof msc
	 */
	mod.msc.degToRad = function(degree){
		return 0.0174533*degree;
	};

	/**
	 * Converts radians into degrees
	 * @param {float} radians - Radians to be converted
	 * @returns {float} Value in Degrees
	 * @memberof msc
	 */
	mod.msc.radToDeg = function(radians){
		return 57.29*radians;
	};	

	/**
	 * Returns the sine value of an angle
	 * @param {float} angle - Angle in degrees
	 * @returns {float} Sine value
	 * @memberof msc
	 */
	mod.msc.sin = function( angle ){
		return Math.sin( 0.0174533*angle )
	}

	/**
	 * Returns the cos value of an angle
	 * @param {float} angle - Angle in degrees
	 * @returns {float} Sine value
	 * @memberof msc
	 */
	mod.msc.cos = function( angle ){
		return Math.cos( 0.0174533*angle )
	}

	/**
	 * Converts RGB values into Hex color code
	 * @param {int} red - Value between 0-255 for red color
	 * @param {int} green - Value between 0-255 for green color
	 * @param {int} blue - Value between 0-255 for blue color
	 * @returns {string} - HexValue
	 * @memberof msc
	 */
/*	mod.msc.rgbToHex = function(red, green, blue){
		
		return '0x'+toHex(red)+toHex(green)+toHex(blue);
			
		function toHex(n) {
			 n = parseInt(n,10);
			 if (isNaN(n)) return "00";
			 n = Math.max(0,Math.min(n,255));
			 return "0123456789ABCDEF".charAt((n-n%16)/16)
				  + "0123456789ABCDEF".charAt(n%16);
		}
	};*/
	
	/**
	 * Returns value of a number upto significant digits
	 * @param {float} number  - Number
	 * @param {int} digits  - Number of significant digits needed
	 * @returns {float} 
	 * @memberof msc
	 */
	mod.msc.sigDig = function(number, digits){
		return number.toFixed(digits);
	};

	/**
	 * Prints to console
	 * @param {string} content - Message to be printed on the console
	 * @returns {null}
	 * @memberof msc
	 */
	mod.msc.print = function(content){
		// try to find MOBIUS web app, if found print in MOBIUS console

		this.content = content;

		try{
			var logString = "<div style='color: green;'>" + this.content + '</div>';
			document.getElementById('log').innerHTML += logString;
		}catch(err){
			console.log('warnning: MOBIUS web app not connected.');
		}
	};
	return mod;

})(MOBIUS_MODULES[MODULE_NAME] || {});


/*
 *
 * Bridging Functions for all libraries used in Module - for geometry and topology
 *
 */

//
//	Functions forming bridge between data structure, topology and modules
//	Dependent on the modules being used for geometry and topology
//

//
//	Requirements
//	Function names should remain the same
//

//
//	Function to convert module geometry into three.js Mesh geometry
//  Add another if-else condition for each new geometry
//
//
//	Function to convert module geometry into three.js Mesh geometry
//  Add another if-else condition for each new geometry
//
//
//	Function to convert module geometry into three.js Mesh geometry
//  Add another if-else condition for each new geometry
//
var convertGeomToThree = function( geom ){

    // internal function
    convertToThree = function(singleDataObject){
        if( singleDataObject instanceof verb.geom.NurbsSurface )
            return ( new THREE.Mesh( singleDataObject.toThreeGeometry() ) );
        else if( singleDataObject instanceof verb.geom.NurbsCurve )
            return ( new THREE.Line( singleDataObject.toThreeGeometry() ) );
        else if(singleDataObject instanceof Array){

            if(singleDataObject[0].is_mObj){

                var threeObject = new THREE.Object3D();
                for(var j=0; j < singleDataObject.length; j++){
                	var extractedThreeGeometry  =  singleDataObject[ j ].extractThreeGeometry() ;
                    threeObject.add( extractedThreeGeometry)
                }

                return threeObject;
            }

            // means it is a point
            var dotGeometry = new THREE.Geometry();
            dotGeometry.vertices.push( new THREE.Vector3(singleDataObject[0], singleDataObject[1], singleDataObject[2]) ); console.log("here");
            return new THREE.PointCloud( dotGeometry );
        }
        else {
            console.log("Module doesnt recognise either!", singleDataObject);
        }
    }

    var rawResult = convertToThree( geom );

    return rawResult;
}


//
// Takes native topology and converts it into three.js format
//
var convertTopoToThree = function( topology ){

	var topo = new THREE.Object3D();
	
	// convert vertices
	var topoPointMaterial = new THREE.PointsMaterial( { size: 5, sizeAttenuation: false, color:0xCC3333 } );
	var dotGeometry = new THREE.Geometry(); 
	for(var v = 0; v < topology.vertices.length; v++){
		var vertex = topology.vertices[v].getGeometry();
		dotGeometry.vertices.push( new THREE.Vector3(vertex[0], vertex[1], vertex[2]) );
	}
	var allVertices = new THREE.Points( dotGeometry, topoPointMaterial );
	topo.add(allVertices);

 	
	// convert edges
	var topoEdgeMaterial = new THREE.LineBasicMaterial({
							    side: THREE.DoubleSide,
							    linewidth: 100,
							    color: 0x003366
							    });
	for(var e = 0; e < topology.edges.length; e++){ 
		var edge = convertGeomToThree(topology.edges[e].getGeometry());
		edge.material = topoEdgeMaterial;
		topo.add(edge);


	}

	// convert faces
	var topoSurfaceMaterial = new THREE.MeshLambertMaterial( {
									    side: THREE.DoubleSide,
									    wireframe: false,
									    //shading: THREE.SmoothShading,
									    transparent: false,
									    color: 0x6666FF
									    } );
	for(var f = 0; f < topology.faces.length; f++){ 
		var face = convertGeomToThree(topology.faces[f].getGeometry());
		face.material = topoSurfaceMaterial;
		topo.add(face);

		//addNumber( "FaceNumber"+f, face);
	} 

	return topo;

}

//
//	Takes native geometry ( geometry from module ) and converts it into native topology - edges, faces, vertices
//
var computeTopology = function( mObj ){

	var geom = mObj.getGeometry(); 
	var topology = {};


	if(mObj instanceof mObj_geom_Vertex){
		topology.vertices = [];
		topology.edges = [];
		topology.faces = [];
	}
	else if(mObj instanceof mObj_geom_Curve){
		topology.vertices = [ new mObj_geom_Vertex(geom.point(0)) , new mObj_geom_Vertex(geom.point(1)) ];
		topology.edges = [ mObj ];
		topology.faces = [];
	}	
	else if(mObj instanceof mObj_geom_Surface){
		topology.vertices = [ new mObj_geom_Vertex(geom.point(0,0)), 
								 new mObj_geom_Vertex(geom.point(1,0)), 
									 new mObj_geom_Vertex(geom.point(1,1)), 
										 new mObj_geom_Vertex(geom.point(0,1))];
		topology.edges = geom.boundaries().map( function( boundary ) { return new mObj_geom_Curve( boundary )} );
		topology.faces = [mObj];
	}	
	else if(mObj instanceof mObj_geom_Solid){
		// means it is a solid - collection of surfaces
		topology.vertices = [];
		topology.edges = [];
		topology.faces = [];

		for(var srf=0; srf < geom.length; srf++){
			var surfaceTopo = geom[srf].getTopology(); 
			topology.vertices = topology.vertices.concat(surfaceTopo.vertices); 
			topology.edges = topology.edges.concat(surfaceTopo.edges);
			topology.faces = topology.faces.concat(surfaceTopo.faces);		
		}

		// remove clones - doesn't do well with the edges :/
/*		topology.vertices = removeClonesInList( topology.vertices ); 
		topology.edges = removeClonesInList( topology.edges );
		topology.faces = removeClonesInList( topology.faces ); */
	}
	else
		topology = undefined;	


	return topology;
}

//
// function to remove clones
//
//
var removeClonesInList = function( list ){
		var newArray = [];
		
		for(var v=0; v < list.length; v++){

			var thisObject = list[v].getGeometry() ; 
			var duplicate = false;
			//console.log(thisObject);
			for(nextV=v+1; nextV < list.length; nextV++){
			
				var nextObject = list[nextV].getGeometry() ; 

				if(thisObject._data != undefined)
					thisObject = thisObject._data;
				if (nextObject._data != undefined)		
					nextObject = nextObject._data; 

				if( thisObject.constructor.name == "Array" ){ 
					if( JSON.stringify( thisObject ) == JSON.stringify( nextObject ) ){
						duplicate = true; console.log(thisObject);
						break; 
					}
				}else{
						for(property in thisObject){
							if(thisObject.hasOwnProperty(property)){ 
								if(thisObject[property] != nextObject[property]){
									duplicate = false; 
									break;
								}
								else
									duplicate = true;	
							}
						}
					if(!duplicate)
						break;	
				}
			}
			
			if( !duplicate )
				newArray.push(list[v]);
		}

		return newArray;
}


var GLOBAL = MOBIUS_MODULES[MODULE_NAME].frm.byXYAxes( [0,0,0], [1,0,0], [0,1,0] );
MOBIUS_MODULES[MODULE_NAME]._FN = {};
MOBIUS_MODULES[MODULE_NAME]._FN.convertGeomToThree = convertGeomToThree;
MOBIUS_MODULES[MODULE_NAME]._FN.convertTopoToThree = convertTopoToThree;
MOBIUS_MODULES[MODULE_NAME]._FN.computeTopology = computeTopology;