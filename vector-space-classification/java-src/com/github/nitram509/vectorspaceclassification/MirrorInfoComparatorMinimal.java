/*******************************************************************************
 * Copyright (c) 2008, 2012 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     martin.kirst@s1998.tu-chemnitz.de - fixed and improved sort algorithm
 *******************************************************************************/
package com.github.nitram509.vectorspaceclassification;

import java.util.Comparator;

import static java.lang.Math.sqrt;

public class MirrorInfoComparatorMinimal implements Comparator<MirrorInfoMinimal> {

  final double refSpeed;
  final double refFailures;
  final double refDistance;
  final double refEuclidLen;

  public MirrorInfoComparatorMinimal(long speed, int failures, int distance) {
    refSpeed = speed;
    refFailures = failures;
    refDistance = distance;
    refEuclidLen = sqrt(refSpeed * refSpeed + refFailures * refFailures + refDistance*refDistance);
  }

  public int compare(MirrorInfoMinimal o1, MirrorInfoMinimal o2) {
    if (o1 == o2) return 0;
    // euclidean lengths
    double o1_el = sqrt(o1.speed*o1.speed + o1.failures*o1.failures + o1.distance*o1.distance);
    double o2_el = sqrt(o2.speed*o2.speed + o2.failures*o2.failures + o2.distance*o2.distance);
    // vector dot products
    double dp_1 = (refSpeed *o1.speed + refFailures *o1.failures + refDistance*o1.distance);
    double dp_2 = (refSpeed *o2.speed + refFailures *o2.failures + refDistance*o2.distance);
    // similarities from o1 to Reference and o2 to Reference
    double similarity1 = dp_1 / (refEuclidLen * o1_el);
    double similarity2 = dp_2 / (refEuclidLen * o2_el);
    return Double.compare(similarity1, similarity2);
  }

}